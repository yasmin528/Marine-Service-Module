import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vessel } from '../models/vessel.model';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  private vesselsSource = new BehaviorSubject<Vessel[]>([]);
  vessels$: Observable<Vessel[]> = this.vesselsSource.asObservable();

  constructor() {
    this.vesselsSource.next([
      { no: 1, name: '50 LET OKTYABRYA', imo: '8888888', year: 2008, type: 'General Cargo', flag: 'Russia', crew: 18, engineType: 'MAN B&W', engineModel: '6S60MC-C', owner: 'State Shipping', dwt: '30000', teu: '0', phone: '+712345678', email: '50let.ops@state.com' },
      { no: 2, name: 'MV Voyager', imo: '9336959', year: 2008, type: 'Container', flag: 'Panama', crew: 22, engineType: 'MAN B&W', engineModel: '6S60MC-C', owner: 'Oceanic Transport', dwt: '50698', teu: '4250', phone: '+123456789', email: 'voyager.ops@oceanic.com' },
      { no: 3, name: 'MT Neptune', imo: '9299565', year: 2005, type: 'Oil Tanker', flag: 'Liberia', crew: 25, engineType: 'Wärtsilä', engineModel: '7RTA84T-D', owner: 'PetroMaritime', dwt: '159000', teu: '', phone: '+234567890', email: 'neptune.master@petromar.com' },
      { no: 4, name: 'Bulk Master', imo: '9413725', year: 2010, type: 'Bulk Carrier', flag: 'Marshall Islands', crew: 20, engineType: 'Sulzer', engineModel: '6RTA58T', owner: 'Grain Corp', dwt: '76000', teu: '', phone: '+345678901', email: 'bulkmaster.cpt@graincorp.com' },
    ]);
  }

  

  addVessel(vessel: Vessel) {
    const current = this.vesselsSource.getValue();
    this.vesselsSource.next([...current, vessel]);
  }
}
