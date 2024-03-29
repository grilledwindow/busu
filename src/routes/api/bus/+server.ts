import { DATAMALL_KEY } from '$env/static/private'

export const GET = (e) => {
  return fetch('http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=83139', {
    headers: { 'accountKey': DATAMALL_KEY }
  });
}
