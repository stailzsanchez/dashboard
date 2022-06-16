import React, { useCallback, useState } from 'react';
import './Diagram.css';
import { titleToRu } from '../../utils/titleToRuDict';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PieController,
  ArcElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';
ChartJS.register(PieController, ArcElement, Title, Legend, Tooltip);

export type DiagramInfoType = {
  active: number;
  inactive: number;
  completed: number;
};

export type DiagramType = {
  title: string;
  info: DiagramInfoType;
};

const Diagram = (props: DiagramType) => {
  const { title, info } = props;
  const { active, inactive, completed } = info;

  const [selectStat, setSelectStat] = useState<number | null>();

  const styleTableItem = (index: number) =>
    'diagram__item' + (index === selectStat ? ' diagram__item--active' : '');

  const total = active + inactive + completed;

  const hoverlabel = {
    id: 'hoverlabel',
    afterDraw: (chart: any) => {
      const {
        ctx,
        chartArea: { width, height },
      } = chart;
      ctx.save();


      if (chart._active?.length > 0) {
        //shorts
        const _data = chart.config.data;
        const _index = chart._active[0].index;
        const _indexDataSet = chart._active[0].datasetIndex;
        console.log('_index', _index);

        //params
        const textLabel = titleToRu(title);
        const numberLabel = _data.datasets[_indexDataSet].data[_index];
        const colorLabel = '#FF982B';

        //Text label
        ctx.font = 'normal 18px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'center';
        ctx.fillText(textLabel, width / 2, height / 2 - 15);

        //Number
        ctx.font = 'normal 45px Arial';
        ctx.fillStyle = colorLabel;
        ctx.fillText(numberLabel, width / 2, height / 2 + 35);
      } else {
        //params
        const textLabel = titleToRu(title);
        const numberLabel = total;
        const colorLabel = '#FF982B';

        //Text label
        ctx.font = 'normal 18px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'center';
        ctx.fillText(textLabel, width / 2, height / 2 - 15);

        //Number
        ctx.font = 'normal 45px Arial';
        ctx.fillStyle = colorLabel;
        ctx.fillText(numberLabel, width / 2, height / 2 + 35);
      }
    },
  };

  const dataChart = {
    datasets: [
      {
        data: [active, inactive, completed],
        nameDiagram: title,
        backgroundColor: ['#F9A752', '#FCCF82', '#F2F0F5'],
        borderWidth: 3,
        cutout: '85%',
      },
    ],
    labels: ['Активные', 'Неактивные', 'Завершенные'],
  };

  const optionsChart = {
    plugins: {
      legend: {
        display: false,
      },
      animation: {
        animateRotate: true,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const config = {
    data: dataChart,
    options: optionsChart,
    plugins: [hoverlabel],
  };

  const itemsTable = [
    { title: 'Активных:', value: active, classItem: 'diagram__active' },
    { title: 'Неактивных:', value: inactive, classItem: 'diagram__inactive' },
    {
      title: 'Завершенных:',
      value: completed,
      classItem: 'diagram__completed',
    },
  ];

  return (
    <div className="diagram__wrap">
      <div className="diagram">
        <Doughnut {...config} />
      </div>
      <div className="diagram__table">
        <div className={'diagram__total diagram__item'}>
          <div className="diagram__item-text">Всего:</div>
          <div>{total}</div>
        </div>
        {itemsTable.map(({ title, value, classItem }, index) => (
          <div
            className={styleTableItem(index)}
            onMouseOver={() => setSelectStat(index)}
            onMouseOut={() => setSelectStat(null)}
          >
            <div className="diagram__item-text">{title}</div>
            <div>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Diagram;
