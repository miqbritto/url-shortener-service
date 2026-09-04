import { BadRequestException, Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import type { Request, Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() body: { url:string }
  ) {
    if(!body.url) {
      throw new BadRequestException('URL is required');
    }

    return this.urlService.createShortUrl(body.url);
  }
}
