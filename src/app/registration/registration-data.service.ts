import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppRoutesNames} from "../app-routes-names.enum";
import {RegistrationField} from "./registration-field";
import {Observable} from "rxjs";
import {RegistrationRequest} from "./registration-request";


@Injectable()
export class RegistrationDataService {
  constructor(private http: HttpClient) {
  }

  public register(request: RegistrationRequest) {
    return this.http.post<RegistrationRequest>(this.getUrl('register'), request);
  }

  public getRegistrationFields(): Observable<RegistrationField[]> {
    return this.http.get<RegistrationField[]>(this.getUrl('fields'));
  }

  private getUrl(controller: string): string {
    return `/${AppRoutesNames.Registration}/${controller}`;
  }
}
