import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UrlEntity } from '../db/entities/url.entity';
import { randomBytes } from 'crypto';
import dataSourceOptions from '../db/typeOrm.migration-config'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UrlService {

    constructor(
        @InjectRepository(UrlEntity) 
        private readonly urlRepo: Repository<UrlEntity>,
    ) {}


   private generateShortCode(): string {
     return randomBytes(6).toString('base64url');
   }

   async generateUniqueShortCode() {

    while (true) {
        const shortCode = this.generateShortCode()

        const exists = await this.urlRepo.exists({
            where: { shortCode }
        })

        if (!exists) {
            return shortCode;
        }
    }
   }

    async createShortUrl(url: string): Promise<UrlEntity> {
        const urlEntity = this.urlRepo.create({
            url,
            shortCode: await this.generateUniqueShortCode()
        });

        return this.urlRepo.save(urlEntity);
    }
}
