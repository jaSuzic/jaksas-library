import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

    fetchImageBlob(fileName: string) {
        const name = fileName ? fileName : 'noImage.png';
        return firstValueFrom(this.http.post(
            BACKEND_URL + '/fetchImage',
            { fileName: name },
            { responseType: 'blob' }
        ));
    }

    createImageFromBlob(imageUrl: Blob): Promise<SafeUrl> {
        return new Promise<SafeUrl>((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                resolve(
                    this.domSanitizer.bypassSecurityTrustUrl(
                        reader.result as string
                    )
                );
            });

            if (imageUrl) {
                reader.readAsDataURL(imageUrl);
            } else {
                reject();
            }
        });
    }

    getImage(imagePath: string) {
        return this.fetchImageBlob(imagePath).then(imageBlob => {
            return this.createImageFromBlob(imageBlob).then(result => {
                return result
            })
        })
    }


}
