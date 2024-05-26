import React from 'react';
import CircleButton from "../Buttons/CircleButton/CircleButtonUI";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../../redux/slice/productSlice";
import styles from "./styles.module.scss";
import {RootState} from "../../../redux/redux";

const Pagination: React.FC = () => {
	const { totalCount, limit, currentPage } = useSelector((state: RootState) => state.products)
	const dispatch = useDispatch()
	
	
	const handlePageChange = (page: number): void =>{
		dispatch(setCurrentPage(page))
	}
	const renderPaginationButtons = () => {
		const pageCount =  Math.ceil(totalCount / limit);
		if(pageCount !== 1){
			const buttons = [];
			const rangeStart = Math.max(currentPage - 2, 1); // определяем начало диапазона (минимум 1)
			const rangeEnd = Math.min(rangeStart + 4, pageCount); // определяем конец диапазона (максимум pageCount)
			
			for (let i = rangeStart; i <= rangeEnd; i++)
				buttons.push(
					<CircleButton key={i} onClick={() => handlePageChange(i)} text={i} active={(i === currentPage)}/>
				);
			
			
			if (currentPage > 3 && currentPage < 6) {
				buttons.unshift(
					<CircleButton key="prev" active onClick={() => handlePageChange(currentPage - 1)} arrowLeft />
				);
			}else if(currentPage >= 5 && currentPage <= pageCount){
				buttons.unshift(
					<CircleButton key="..." onClick={() => handlePageChange(currentPage - 1)}  text='...'/>
				);
				
				buttons.unshift(
					<CircleButton key="prev" onClick={() => handlePageChange(1)} text={1} />
				);
				
			}
			if (currentPage < pageCount - 2 && pageCount > 5) {
				buttons.push(
					<CircleButton key="next" active onClick={() => handlePageChange(currentPage + 1)} arrowRight />
				);
			}
			return buttons;
		}
	}
	
	return (
		<div className={styles.PaginationContainer}>
			{renderPaginationButtons()}
		</div>
	);
};

export default Pagination;