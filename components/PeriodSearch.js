import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function PeriodSearch(props) {
  const { defaultStart, defaultEnd, onSubmit } = props;
  const [start, setStartDate] = React.useState(new Date(defaultStart));
  const [end, setEndDate] = React.useState(new Date(defaultEnd));

  function submit() {
    const dateFns = new DateFnsUtils();

    try {
      onSubmit(
        dateFns.format(start, 'yyyy-MM-dd'),
        dateFns.format(end, 'yyyy-MM-dd'),
      );
    } catch (e) {

    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Pediod start"
          format="dd.MM.yyyy"
          value={start}
          onChange={(e) => setStartDate(e)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Pediod end"
          format="dd.MM.yyyy"
          value={end}
          onChange={(e) => setEndDate(e)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={submit}
        >
          {'Submit'}
        </Button>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
