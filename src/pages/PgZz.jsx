import React from 'react';
import uuid from 'uuid/v1';
import times from 'lodash/times';

const PgTesList = React.memo(({ id, text, handleClick }) => {
  console.log('render zz');

  return (
    <div onClick={() => handleClick(id)}>
      {id}: {text}
    </div>
  );
});

const PgZz = () => {
  const [list, listSet] = React.useState(
    times(5000, () => ({
      id: uuid(),
      text: 'AAA'
    }))
  );

  const handleClick = React.useCallback(id => listSet(_list => _list.filter(v => v.id !== id)), []);

  return (
    <>
      <div>asdakldj sadjasl djasl djsakld j</div>
      <div>asdakldj sadjasl djasl djsakld j</div>
      <div>asdakldj sadjasl djasl djsakld j</div>
      <div>asdakldj sadjasl djasl djsakld j</div>
      <div>asdakldj sadjasl djasl djsakld j</div>
      <div>asdakldj sadjasl djasl djsakld j</div>

      {list.map(v => (
        <PgTesList {...v} key={v.id} handleClick={handleClick}></PgTesList>
      ))}
    </>
  );
};

export default PgZz;
