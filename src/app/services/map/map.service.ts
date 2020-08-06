import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators'
import { MapData } from 'src/app/models/map-data';
import { Country } from 'src/app/models/country';
import { MainService } from 'src/app/services/main/main.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  //valores por default, son necesarios nada mas por el ID
  defaultMapData:MapData[] = [
    { "id":"AF", "name":"Afghanistan", "value":0, "color":"#00ff00" },
    { "id":"AL", "name":"Albania", "value":3215988, "color":"#00ff00" },
    { "id":"DZ", "name":"Algeria", "value":35980193, "color":"#00ff00" },
    { "id":"AO", "name":"Angola", "value":19618432, "color":"#00ff00" },
    { "id":"AR", "name":"Argentina", "value":40764561, "color":"#00ff00" },
    { "id":"AM", "name":"Armenia", "value":3100236, "color":"#00ff00" },
    { "id":"AU", "name":"Australia", "value":22605732, "color":"#8aabb0" },
    { "id":"AT", "name":"Austria", "value":8413429, "color":"#00ff00" },
    { "id":"AZ", "name":"Azerbaijan", "value":9306023, "color":"#00ff00" },
    { "id":"BH", "name":"Bahrain", "value":1323535, "color": "#00ff00" },
    { "id":"BD", "name":"Bangladesh", "value":150493658, "color": "#00ff00" },
    { "id":"BY", "name":"Belarus", "value":9559441, "color":"#00ff00" },
    { "id":"BE", "name":"Belgium", "value":10754056, "color":"#00ff00" },
    { "id":"BJ", "name":"Benin", "value":9099922, "color":"#00ff00" },
    { "id":"BT", "name":"Bhutan", "value":738267, "color": "#00ff00" },
    { "id":"BO", "name":"Bolivia", "value":10088108, "color":"#00ff00" },
    { "id":"BA", "name":"Bosnia and Herzegovina", "value":3752228, "color":"#00ff00" },
    { "id":"BW", "name":"Botswana", "value":2030738, "color":"#00ff00" },
    { "id":"BR", "name":"Brazil", "value":196655014, "color":"#00ff00" },
    { "id":"BN", "name":"Brunei", "value":405938, "color": "#00ff00" },
    { "id":"BG", "name":"Bulgaria", "value":7446135, "color":"#00ff00" },
    { "id":"BF", "name":"Burkina Faso", "value":16967845, "color":"#00ff00" },
    { "id":"BI", "name":"Burundi", "value":8575172, "color":"#00ff00" },
    { "id":"KH", "name":"Cambodia", "value":14305183, "color": "#00ff00" },
    { "id":"CM", "name":"Cameroon", "value":20030362, "color":"#00ff00" },
    { "id":"CA", "name":"Canada", "value":34349561, "color":"#00ff00" },
    { "id":"CV", "name":"Cape Verde", "value":500585, "color":"#00ff00" },
    { "id":"CF", "name":"Central African Rep.", "value":4486837, "color":"#00ff00" },
    { "id":"TD", "name":"Chad", "value":11525496, "color":"#00ff00" },
    { "id":"CL", "name":"Chile", "value":17269525, "color":"#00ff00" },
    { "id":"CN", "name":"China", "value":1347565324, "color": "#00ff00" },
    { "id":"CO", "name":"Colombia", "value":46927125, "color":"#00ff00" },
    { "id":"KM", "name":"Comoros", "value":753943, "color":"#00ff00" },
    { "id":"CD", "name":"Congo", "value":67757577, "color":"#00ff00" },
    { "id":"CG", "name":"Congo, Rep.", "value":4139748, "color":"#00ff00" },
    { "id":"CR", "name":"Costa Rica", "value":4726575, "color":"#00ff00" },
    { "id":"CI", "name":"Cote d'Ivoire", "value":20152894, "color":"#00ff00" },
    { "id":"HR", "name":"Croatia", "value":4395560, "color":"#00ff00" },
    { "id":"CU", "name":"Cuba", "value":11253665, "color":"#00ff00" },
    { "id":"CY", "name":"Cyprus", "value":1116564, "color":"#00ff00" },
    { "id":"CZ", "name":"Czechia", "value":10534293, "color":"#00ff00" },
    { "id":"DK", "name":"Denmark", "value":5572594, "color":"#00ff00" },
    { "id":"DJ", "name":"Djibouti", "value":905564, "color":"#00ff00" },
    { "id":"DO", "name":"Dominican Republic", "value":10056181, "color":"#00ff00" },
    { "id":"EC", "name":"Ecuador", "value":14666055, "color":"#00ff00" },
    { "id":"EG", "name":"Egypt", "value":82536770, "color":"#00ff00" },
    { "id":"SV", "name":"El Salvador", "value":6227491, "color":"#00ff00" },
    { "id":"GQ", "name":"Equatorial Guinea", "value":720213, "color":"#00ff00" },
    { "id":"ER", "name":"Eritrea", "value":5415280, "color":"#00ff00" },
    { "id":"EE", "name":"Estonia", "value":1340537, "color":"#00ff00" },
    { "id":"ET", "name":"Ethiopia", "value":84734262, "color":"#00ff00" },
    { "id":"FJ", "name":"Fiji", "value":868406, "color":"#8aabb0" },
    { "id":"FI", "name":"Finland", "value":5384770, "color":"#00ff00" },
    { "id":"FR", "name":"France", "value":63125894, "color":"#00ff00" },
    { "id":"GA", "name":"Gabon", "value":1534262, "color":"#00ff00" },
    { "id":"GM", "name":"Gambia", "value":1776103, "color":"#00ff00" },
    { "id":"GE", "name":"Georgia", "value":4329026, "color":"#00ff00" },
    { "id":"DE", "name":"Germany", "value":82162512, "color":"#00ff00" },
    { "id":"GH", "name":"Ghana", "value":24965816, "color":"#00ff00" },
    { "id":"GR", "name":"Greece", "value":11390031, "color":"#00ff00" },
    { "id":"GT", "name":"Guatemala", "value":14757316, "color":"#00ff00" },
    { "id":"GN", "name":"Guinea", "value":10221808, "color":"#00ff00" },
    { "id":"GW", "name":"Guinea-Bissau", "value":1547061, "color":"#00ff00" },
    { "id":"GY", "name":"Guyana", "value":756040, "color":"#00ff00" },
    { "id":"HT", "name":"Haiti", "value":10123787, "color":"#00ff00" },
    { "id":"HN", "name":"Honduras", "value":7754687, "color":"#00ff00" },
    { "id":"HK", "name":"Hong Kong", "value":7122187, "color": "#00ff00" },
    { "id":"HU", "name":"Hungary", "value":9966116, "color":"#00ff00" },
    { "id":"IS", "name":"Iceland", "value":324366, "color":"#00ff00" },
    { "id":"IN", "name":"India", "value":1241491960, "color": "#00ff00" },
    { "id":"ID", "name":"Indonesia", "value":242325638, "color": "#00ff00" },
    { "id":"IR", "name":"Iran", "value":74798599, "color": "#00ff00" },
    { "id":"IQ", "name":"Iraq", "value":32664942, "color": "#00ff00" },
    { "id":"IE", "name":"Ireland", "value":4525802, "color":"#00ff00" },
    { "id":"IL", "name":"Israel", "value":7562194, "color": "#00ff00" },
    { "id":"IT", "name":"Italy", "value":60788694, "color":"#00ff00" },
    { "id":"JM", "name":"Jamaica", "value":2751273, "color":"#00ff00" },
    { "id":"JP", "name":"Japan", "value":126497241, "color": "#00ff00" },
    { "id":"JO", "name":"Jordan", "value":6330169, "color": "#00ff00" },
    { "id":"KZ", "name":"Kazakhstan", "value":16206750, "color": "#00ff00" },
    { "id":"KE", "name":"Kenya", "value":41609728, "color":"#00ff00" },
    { "id":"KP", "name":"Korea, Dem. Rep.", "value":24451285, "color": "#00ff00" },
    { "id":"KR", "name":"Korea, Rep.", "value":48391343, "color": "#00ff00" },
    { "id":"KW", "name":"Kuwait", "value":2818042, "color": "#00ff00" },
    { "id":"KG", "name":"Kyrgyzstan", "value":5392580, "color": "#00ff00" },
    { "id":"LA", "name":"Laos", "value":6288037, "color": "#00ff00" },
    { "id":"LV", "name":"Latvia", "value":2243142, "color":"#00ff00" },
    { "id":"LB", "name":"Lebanon", "value":4259405, "color": "#00ff00" },
    { "id":"LS", "name":"Lesotho", "value":2193843, "color":"#00ff00" },
    { "id":"LR", "name":"Liberia", "value":4128572, "color":"#00ff00" },
    { "id":"LY", "name":"Libya", "value":6422772, "color":"#00ff00" },
    { "id":"LT", "name":"Lithuania", "value":3307481, "color":"#00ff00" },
    { "id":"LU", "name":"Luxembourg", "value":515941, "color":"#00ff00" },
    { "id":"MK", "name":"Macedonia", "value":2063893, "color":"#00ff00" },
    { "id":"MG", "name":"Madagascar", "value":21315135, "color":"#00ff00" },
    { "id":"MW", "name":"Malawi", "value":15380888, "color":"#00ff00" },
    { "id":"MY", "name":"Malaysia", "value":28859154, "color": "#00ff00" },
    { "id":"ML", "name":"Mali", "value":15839538, "color":"#00ff00" },
    { "id":"MR", "name":"Mauritania", "value":3541540, "color":"#00ff00" },
    { "id":"MU", "name":"Mauritius", "value":1306593, "color":"#00ff00" },
    { "id":"MX", "name":"Mexico", "value":114793341, "color":"#00ff00" },
    { "id":"MD", "name":"Moldova", "value":3544864, "color":"#00ff00" },
    { "id":"MN", "name":"Mongolia", "value":2800114, "color": "#00ff00" },
    { "id":"ME", "name":"Montenegro", "value":632261, "color":"#00ff00" },
    { "id":"MA", "name":"Morocco", "value":32272974, "color":"#00ff00" },
    { "id":"MZ", "name":"Mozambique", "value":23929708, "color":"#00ff00" },
    { "id":"MM", "name":"Myanmar", "value":48336763, "color": "#00ff00" },
    { "id":"NA", "name":"Namibia", "value":2324004, "color":"#00ff00" },
    { "id":"NP", "name":"Nepal", "value":30485798, "color": "#00ff00" },
    { "id":"NL", "name":"Netherlands", "value":16664746, "color":"#00ff00" },
    { "id":"NZ", "name":"New Zealand", "value":4414509, "color":"#8aabb0" },
    { "id":"NI", "name":"Nicaragua", "value":5869859, "color":"#00ff00" },
    { "id":"NE", "name":"Niger", "value":16068994, "color":"#00ff00" },
    { "id":"NG", "name":"Nigeria", "value":162470737, "color":"#00ff00" },
    { "id":"NO", "name":"Norway", "value":4924848, "color":"#00ff00" },
    { "id":"OM", "name":"Oman", "value":2846145, "color": "#00ff00" },
    { "id":"PK", "name":"Pakistan", "value":176745364, "color": "#00ff00" },
    { "id":"PA", "name":"Panama", "value":3571185, "color":"#00ff00" },
    { "id":"PG", "name":"Papua New Guinea", "value":7013829, "color":"#8aabb0" },
    { "id":"PY", "name":"Paraguay", "value":6568290, "color":"#00ff00" },
    { "id":"PE", "name":"Peru", "value":29399817, "color":"#00ff00" },
    { "id":"PH", "name":"Philippines", "value":94852030, "color": "#00ff00" },
    { "id":"PL", "name":"Poland", "value":38298949, "color":"#00ff00" },
    { "id":"PT", "name":"Portugal", "value":10689663, "color":"#00ff00" },
    { "id":"PR", "name":"Puerto Rico", "value":3745526, "color":"#00ff00" },
    { "id":"QA", "name":"Qatar", "value":1870041, "color": "#00ff00" },
    { "id":"RO", "name":"Romania", "value":21436495, "color":"#00ff00" },
    { "id":"RU", "name":"Russia", "value":142835555, "color":"#00ff00" },
    { "id":"RW", "name":"Rwanda", "value":10942950, "color":"#00ff00" },
    { "id":"SA", "name":"Saudi Arabia", "value":28082541, "color": "#00ff00" },
    { "id":"SN", "name":"Senegal", "value":12767556, "color":"#00ff00" },
    { "id":"RS", "name":"Serbia", "value":9853969, "color":"#00ff00" },
    { "id":"SL", "name":"Sierra Leone", "value":5997486, "color":"#00ff00" },
    { "id":"SG", "name":"Singapore", "value":5187933, "color": "#00ff00" },
    { "id":"SK", "name":"Slovakia", "value":5471502, "color":"#00ff00" },
    { "id":"SI", "name":"Slovenia", "value":2035012, "color":"#00ff00" },
    { "id":"SB", "name":"Solomon Islands", "value":552267, "color":"#8aabb0" },
    { "id":"SO", "name":"Somalia", "value":9556873, "color":"#00ff00" },
    { "id":"ZA", "name":"South Africa", "value":50459978, "color":"#00ff00" },
    { "id":"ES", "name":"Spain", "value":46454895, "color":"#00ff00" },
    { "id":"LK", "name":"Sri Lanka", "value":21045394, "color": "#00ff00" },
    { "id":"SD", "name":"Sudan", "value":34735288, "color":"#00ff00" },
    { "id":"SR", "name":"Suriname", "value":529419, "color":"#00ff00" },
    { "id":"SZ", "name":"Swaziland", "value":1203330, "color":"#00ff00" },
    { "id":"SE", "name":"Sweden", "value":9440747, "color":"#00ff00" },
    { "id":"CH", "name":"Switzerland", "value":7701690, "color":"#00ff00" },
    { "id":"SY", "name":"Syria", "value":20766037, "color": "#00ff00" },
    { "id":"TW", "name":"Taiwan", "value":23072000, "color": "#00ff00" },
    { "id":"TJ", "name":"Tajikistan", "value":6976958, "color": "#00ff00" },
    { "id":"TZ", "name":"Tanzania", "value":46218486, "color":"#00ff00" },
    { "id":"TH", "name":"Thailand", "value":69518555, "color": "#00ff00" },
    { "id":"TG", "name":"Togo", "value":6154813, "color":"#00ff00" },
    { "id":"TT", "name":"Trinidad and Tobago", "value":1346350, "color":"#00ff00" },
    { "id":"TN", "name":"Tunisia", "value":10594057, "color":"#00ff00" },
    { "id":"TR", "name":"Turkey", "value":73639596, "color":"#00ff00" },
    { "id":"TM", "name":"Turkmenistan", "value":5105301, "color": "#00ff00" },
    { "id":"UG", "name":"Uganda", "value":34509205, "color":"#00ff00" },
    { "id":"UA", "name":"Ukraine", "value":45190180, "color":"#00ff00" },
    { "id":"AE", "name":"UAE", "value":7890924, "color": "#00ff00" },
    { "id":"GB", "name":"UK", "value":62417431, "color":"#00ff00" },
    { "id":"US", "name":"USA", "value":313085380, "color":"#00ff00" },
    { "id":"UY", "name":"Uruguay", "value":3380008, "color":"#00ff00" },
    { "id":"UZ", "name":"Uzbekistan", "value":27760267, "color": "#00ff00" },
    { "id":"VE", "name":"Venezuela", "value":29436891, "color":"#00ff00" },
    { "id":"PS", "name":"West Bank and Gaza", "value":4152369, "color": "#00ff00" },
    { "id":"VN", "name":"Vietnam", "value":88791996, "color": "#00ff00" },
    { "id":"YE", "name":"Yemen", "value":24799880, "color": "#00ff00" },
    { "id":"ZM", "name":"Zambia", "value":13474959, "color":"#00ff00" },
    { "id":"ZW", "name":"Zimbabwe", "value":12754378, "color":"#00ff00" }
  ];



  constructor(private http: HttpClient) { }

  //regresa ya los valores transformados, segun el input de los botones
  getMapData(display:string):Observable<MapData[]>{
    return this.http.get<any[]>("http://api.coronastatistics.live/countries").pipe(
       map((elements) =>
      {
        elements = elements.map((element) => { return {
           'id' : this.getId(element.country)[0] ? this.getId(element.country)[0].id : null,
           'name' : element.country,
           'value': element[display],
           'color': (display==="cases"?'#006BF2':(display==="deaths"?"#FF4D70":(display==="recovered"?"#2BA44B":"#EB955D")))
         }
       }).filter(element => element.id);
        return elements;
     })
    );
  }

  //asigna los ids segun los datos por defecto
  getId(country:string){
    return this.defaultMapData.filter( mapData => mapData.name === country );
  }



}
