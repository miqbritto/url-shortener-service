import { Controller, Post, Req, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import type { Request, Response } from 'express';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const { url } = req.body

      if(!url) {
        return res.status(400).json({
          message: "Missing required fields"
        })
      }

      const newUrl = await this.urlService.createShortUrl(url);

      return res.status(200).json(newUrl);

    } catch (error) {
        if (error instanceof Error) {
          return res.status(404).json({
            message: error.message
          })
        }

    }
  }
}
