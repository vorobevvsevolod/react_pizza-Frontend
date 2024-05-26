import React from 'react';
import styles from "./styles.module.scss";
import {IProductInfo} from "../../../../redux/interface/IProductInfo";

let text: { title: string; subtitle: string }[] = [
	{title:'Энерг. ценность', subtitle: 'ккал'},
	{title:'Белки', subtitle: 'г'},
	{title:'Жиры', subtitle: 'г'},
	{title:'Углеводы', subtitle: 'г'},
	{title:'Вес', subtitle: 'г'},
	{title:'Диаметр', subtitle: 'см'},
]

type DopInfoProps = {
    infoArray: IProductInfo
    top?: string
    right?: string
    typeProduct?: number
}
const DopInfo: React.FC<DopInfoProps> = ({ infoArray, top, right, typeProduct }) => {
	const [ info, setInfo ] = React.useState<Array<number>>([])
	const [showDopInfo, setShowDopInfo ] = React.useState<boolean>(false)
	
	React.useEffect(() =>{
		if(typeProduct === 4){
			text = text.map(item =>{
				if(item.title === 'Вес')
					return {...item, subtitle: 'л'}
				else return item;
			})
		}
	}, [typeProduct])
	
	React.useEffect(() => {
		if(infoArray){
            const { id, createdAt, updatedAt, descripti, description, ...rest } = infoArray; // исключаем поля "id", "createdAt" и "updatedAt"
			const filteredKeys = Object.keys(rest);

            // @ts-ignore
            const filteredValues = filteredKeys.map(key => rest[key]);
			setInfo(filteredValues);
		}
	}, [infoArray]);
	return (
		<div className={styles.info_container}>
			<svg className={styles.svg} onClick={() => setShowDopInfo(!showDopInfo)} width="28" height="28" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="#000"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 11a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1z" fill="#000"></path><path d="M13.5 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" fill="#000"></path></svg>
			{(showDopInfo) ? <div className={styles.info} style={{top: top, right: right}}>
				<span>Пищевая ценность на 100г:</span>
				{
					info.map((item, i) =>
						<div key={i} className={styles.info_container}>
							<p>{text[i].title}</p>
							<p>{`${item} ${text[i].subtitle}`}</p>
						</div>
					)
				}
			</div>
			: <></>}
		</div>
	);
};

export default DopInfo;