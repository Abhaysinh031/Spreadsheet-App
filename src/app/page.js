import React from 'react';
import FormattingPanel from './components/FormattingPanel';
import Grid from './components/Grid';

export default function HomePage() {
  return (
    <div className="p-4">
      <FormattingPanel />
      <Grid />
    </div>
  );
}
