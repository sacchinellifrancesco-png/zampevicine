// Per ora finto, poi colleghiamo Supabase
export async function acceptRequest(requestId: string, myId: string, otherOwnerId: string) {
  console.log('Accettato', requestId, myId, otherOwnerId)
  return true
}

export async function rejectRequest(requestId: string) {
  console.log('Rifiutato', requestId)
  return true
}