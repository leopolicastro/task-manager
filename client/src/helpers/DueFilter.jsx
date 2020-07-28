import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const today = moment()._d;
const yesterday = moment().add(-1, 'days');
const endDate = moment(today).add(7, 'day').endOf('day').toDate();

const dueFilter = (query, tasks, setFilteredTasks) => {
  let filteredTasks = [];
  switch (query) {
    case 'Due Soon':
      const dates = [
        moment(yesterday, 'YYYY-MM-DD'),
        moment(endDate, 'YYYY-MM-DD')
      ];
      const range = moment.range(dates);
      const dueSoon = tasks.filter((task) => {
        return range.contains(moment(task.dueDate));
      });
      filteredTasks = dueSoon;
      break;
    case 'Due Later':
      const dueLater = tasks.filter((task) => {
        return moment(task.dueDate).isAfter(endDate);
      });
      filteredTasks = dueLater;
      break;
    case 'Past Due':
      const pastDue = tasks.filter((task) => {
        return moment(task.dueDate).isBefore(yesterday);
      });
      filteredTasks = pastDue;
      break;
    case 'Not Due':
      const notDue = tasks.filter((task) => {
        return !task.dueDate;
      });
      filteredTasks = notDue;
      break;
    case 'Completed':
      const completed = tasks.filter((task) => {
        return task.completed;
      });
      filteredTasks = completed;
      break;
    case 'Pending':
      const pending = tasks.filter((task) => {
        return !task.completed;
      });
      filteredTasks = pending;
      break;
    default:
      filteredTasks = tasks;
  }
  setFilteredTasks(filteredTasks);
};

export default dueFilter;
