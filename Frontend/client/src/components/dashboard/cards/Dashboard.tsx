import Welcome from "./Welcome";
import Stats from "./Stats"
import Quick_Actions from "./Quick_Action";
import Table from "./Table";

function DashboardL() {
    return (

        <div className="container mx-auto p-8 space-y-8">

            <Welcome />
            <Stats />
            <Quick_Actions />
            <Table />
        </div>
    )
}

export default DashboardL;