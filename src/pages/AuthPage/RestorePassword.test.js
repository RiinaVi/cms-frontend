import React from 'react';
import Button from './LoginFrom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import {handleSubmit } from './RestorePassword';

configure({ 
    adapter: new Adapter() 
});

it('Submit button ', () => {
    const wrapper = shallow((
        <Button>
            <div  className="submit_button login-form-button" />
        </Button>
    ));
    expect(wrapper.contains(<div className="submit_button login-form-button" />)).toBe(true);
});

test("Mock implementation", () => {
    const mock = jest.fn().mockImplementation(() => "bar");    
    expect(mock("foo")).toBe("bar");
    expect(mock).toHaveBeenCalledWith("foo");
});





















