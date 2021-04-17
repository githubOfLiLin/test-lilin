import React from 'react';
import { Row, Col } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { mock } from './mock';
import { currencyPipe, percentPipe } from './utils';
import './App.less';

const { useEffect, useState } = React;

interface IDataItem {
  name: string;
  value: number;
  MoM: number;
  YoY: number;
}
type IFormatedDataItem = Record<keyof IDataItem, string>


function App() {
  const [data, seData] = useState<IFormatedDataItem[]>([]);


  useEffect(() => {
    // 实际情况一般是向后端请求数据后再 formateData
    formateData(mock);
  }, [])

  // 数据格式化
  const formateData = (data: IDataItem[] = []) => {
    seData(data.map(item => ({
      ...item,
      value: currencyPipe(item.value),
      MoM: percentPipe(item.MoM),
      YoY: percentPipe(item.YoY)
    })));
  }

  return (
    <>
      <Row gutter={[0, 24]}>
        {
          data.map(({ name, value, MoM, YoY }) => (
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6} key={name}  >
              <div className='item-box'>
                <div className='name'>{name}</div>
                <div className='value'>{value}</div>
                <div className='rate-wrap'>
                  <div className='rate-item mom'>
                    <span className='label'>月同比</span>
                    <span className='value'><CaretUpOutlined />{MoM}</span>
                  </div>
                  <div className='rate-item yoy'>
                    <span className='label'>年同比</span>
                    <span className='value'><CaretDownOutlined /> {YoY}</span>
                  </div>
                </div>
              </div>

            </Col>
          ))
        }
      </Row>
    </>
  );
}

export default App;
