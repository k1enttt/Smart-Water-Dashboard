import { Action } from "@/schemas/TreeSchema"
import { columns } from "./columns"
import { DataTable } from "./data-table"

interface ActionTableProps {
  data: Action[]
}

const ActionTable = ({ data }: ActionTableProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
 
export default ActionTable;