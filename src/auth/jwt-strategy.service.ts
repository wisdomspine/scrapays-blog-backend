import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { AppConfigService } from 'app-config';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(configService: AppConfigService) {
    const config = configService.oauth0;
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 24,
        jwksUri: `${config.issueDomain}.well-known/jwks.json`,
      }),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.audience,
      issuer: config.issueDomain,
      algorithms: ['RS256'],
    });
  }
  validate(payload) {
    return payload;
  }
}
