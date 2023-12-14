import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AtGuard, RtGuard } from './guards';
import { GetUser, Public } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('sub') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('sub') userId: number,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  // @Post('signup')
  // signup(@Body() dto: AuthDto) {
  //   return this.authService.signup(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('signin')
  // signin(@Body() dto: AuthDto) {
  //   return this.authService.signin(dto);
  // }
}
