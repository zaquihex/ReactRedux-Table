import React from 'react';
import TitleSection from 'components/TitleSection/TitleSection';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import DynamicTable from 'components/DynamicComponents/Table';

const Table = props => (
  <>
  <TitleSection icon={faTable} title='Bootstrap Table' style={{ width: '50%' }} />
  <br/>
<DynamicTable dynamic={false} endpoint='theMovieDB' />
</>
);

export default Table;