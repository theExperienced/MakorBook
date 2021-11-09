const CurrencyBlock = ({ type, data }) => {
  return (
    <div className={type}>
      <h2>{type}</h2>
      {data &&
        data.map((datum) => {
          return (
            <div>
              <p className='price'>{`${datum[1]} BTC @ ${datum[0]} USD`}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CurrencyBlock;
