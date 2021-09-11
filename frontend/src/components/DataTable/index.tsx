import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/SalePage";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

const DataTable = () => {

  const [activePage, setActivePage] = useState(0);

  const [page, setPage] = useState<SalePage>({
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
      .then(response => {
        setPage(response.data);
      });
  }, [activePage]);

  const changePage = (index: number) => {
    setActivePage(index);
  }

  return (
    <>
      <Pagination page={page} onPageChange={changePage}/>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Vendedor</th>
              <th scope="col">Clientes visitados</th>
              <th scope="col">Negócios fechados</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {page.content?.map(sale => (
              <tr key={sale.id}>
                <td>{formatLocalDate(sale.date, "dd/MM/yyyy")}</td>
                <td>{sale.sellerDTO.name}</td>
                <td>{sale.visited}</td>
                <td>{sale.deals}</td>
                <td>{sale.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DataTable;
