import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async sendEmailConfirmation(
    user: { email: string; name: string },
    token: string,
  ) {
    const url = `${this.config.get('ROOT_API')}/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to La Pêche! Please confirm your Email',
      template: 'confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
