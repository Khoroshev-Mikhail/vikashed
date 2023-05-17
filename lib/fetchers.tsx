export async function createFetch(url: string, { arg }: { arg: any }): Promise<any> {
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    });
  }
  
export async function updateFetch(url: string, { arg }: { arg: any }): Promise<any> {
    await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(arg),
    });
}
  
export async function deleteFetch(url: string, { arg }: { arg: any }): Promise<any> {
    await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(arg),
    });
}
  