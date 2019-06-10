import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export interface OffersInterface {
  i: number;
  jobTitle: string;
  companyName: string;
  city: string;
  technology: string;
  salary: string;
  imagePath: string;
  lat: number;
  lng: number;
  details: string;
  requirement: string;
  skills: any;
  markerAnimation: string;
  date;
}
