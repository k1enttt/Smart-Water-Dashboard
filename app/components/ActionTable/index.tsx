import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
 
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      timestamp: "2025-03-31T08:00:00Z",
      message: "Tưới nước thủ công được yêu cầu",
    },
    // ...
  ]
}

const ActionTable = async () => {
  const data = await getData()
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
 
export default ActionTable;