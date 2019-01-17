import 'antd/dist/antd.css';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import FormItem from './RegisterForm';
import sinon from 'sinon';
import {Button} from 'antd';

configure({ 
    adapter: new Adapter() 
});


it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(<Button className="submit_button login-form-button" />);
    wrapper.find('button').simulate('click');
    expect(onClick).toBeTruthy();
  });


test("Mock implementation", () => {
    const mock = jest.fn().mockImplementation(() => "bar");    
    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
});







