// phone-number.pipe.ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PhoneNumberValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    // Check if the value is a string and has a length of 10
    if (typeof value === 'string' && value.length === 10) {
      // Transform the phone number by removing the leading '0' and adding '+254'
      const transformedPhoneNumber = '+254' + value.substring(1);
      return transformedPhoneNumber;
    } else {
      // If validation fails, throw a BadRequestException with a custom message
      throw new BadRequestException('Invalid phone number format. It should be 10 digits long.');
    }
  }
}

 
