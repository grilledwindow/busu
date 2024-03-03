import { DATAMALL_KEY } from '$env/static/private'

export const POST = (e) => {
  console.log(DATAMALL_KEY)
  return new Response({
    status: 200,
    body: {}
  });
}
