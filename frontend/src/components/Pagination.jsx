import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ paging }) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const initialPage = Number(params.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (currentPage !== initialPage) {
      params.set("page", currentPage);
      navigate({ search: params.toString() });
    }
  }, [currentPage, initialPage]);

  const totalPage = paging?.total_page;

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };

  const handleChange = (event) => {
    const value = Number(event.target.value);

    if (value >= 1 && value <= totalPage) {
      setCurrentPage(value);
    } else if (value > totalPage) {
      setCurrentPage(totalPage);
    }
  };

  return (
    <div className="flex justify-end mt-4 join">
      <button
        className="join-item btn"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        «
      </button>
      <label className="join-item btn">
        Page
        <input
          type="text"
          className="w-auto h-full text-center bg-transparent outline-none min-w-8"
          value={initialPage}
          onChange={handleChange}
          style={{
            width: `${(currentPage.toString().length + 1) * 8}px`,
          }}
        />
      </label>
      <button
        className="join-item btn"
        onClick={handleNextPage}
        disabled={currentPage === totalPage}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
