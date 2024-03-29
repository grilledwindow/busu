import { DATAMALL_KEY } from '$env/static/private'

interface NextBus {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Latitude: string;
  Longitude: string;
  VisitNumber: string;
  Load: string;
  Feature: string;
  Type: string;
}

interface BusService {
  ServiceNo: string;
  Operator: string;
  NextBus: NextBus;
  NextBus2: NextBus;
  NextBus3: NextBus;
}

export interface BusArrival {
  "odata.metadata": string;
  BusStopCode: string;
  Services: BusService[];
}

export interface BusArrivalResponse extends Response {
  json: () => Promise<BusArrival>;
}

export const GET = (e): Promise<BusArrivalResponse> => {
  return fetch('http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=83139', {
    headers: { 'accountKey': DATAMALL_KEY }
  });
}
