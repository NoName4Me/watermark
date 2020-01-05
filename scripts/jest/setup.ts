import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

enzyme.configure({ adapter: new Adapter() });
