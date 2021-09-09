import 'regenerator-runtime/runtime';
import { configure } from 'enzyme';
import { toHaveNoViolations } from 'jest-axe';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

expect.extend(toHaveNoViolations);
