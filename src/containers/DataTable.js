import React from 'react';

import Table from 'components/DynamicComponents/Table';

const DataTable = props => (
  <Table dynamic={false} endpoint='theMovieDB' />
);

export default DataTable;