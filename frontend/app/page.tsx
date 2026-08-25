export default async function Page() {
  const res = await fetch('http://localhost:8000/sites', { cache: 'no-store' });
  const sites = await res.json();

  const devicesRes = await fetch('http://localhost:8000/devices', { cache: 'no-store' });
  const devices = await devicesRes.json();

  return (
    <main style={{fontFamily:'system-ui', padding:24}}>
      <h1>OpenGlass</h1>
      <section>
        <h2>Sites</h2>
        <ul>
          {sites.map((s:any)=> <li key={s.id}>{s.name} - {s.description}</li>)}
        </ul>
      </section>
      <section>
        <h2>Devices</h2>
        <table border={1} cellPadding={8}>
          <thead><tr><th>Hostname</th><th>Vendor</th><th>Model</th><th>Status</th></tr></thead>
          <tbody>
            {devices.map((d:any)=>(
              <tr key={d.id}>
                <td>{d.hostname}</td>
                <td>{d.vendor}</td>
                <td>{d.model}</td>
                <td>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
