import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const today = dayjs();

export default function DateValidationDisableFuture({setSelectedDateTimeString, selectedDateTimeString}) {
 
  const handleDateTimeChange = (newDateTime) => {
    const formattedDateTimeString = newDateTime.format('YYYY-MM-DD HH:mm');
    setSelectedDateTimeString(formattedDateTimeString);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
            'DateTimePicker',
            'TimePicker',
            'DateRangePicker',
          ]}
        >
          <DemoItem>
            <DateTimePicker
              value={dayjs(selectedDateTimeString)} // Convierte la cadena a un objeto dayjs para mostrarla en el DateTimePicker
              minDate={today}
              maxDate={null} // Puedes ajustar esto según tus necesidades
              onChange={handleDateTimeChange}
              views={['year', 'month', 'day', 'hours', 'minutes']}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}