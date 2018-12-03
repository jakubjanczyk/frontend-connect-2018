// Import React
import React from 'react';
// Import Spectacle Core tags
import { Appear, CodePane, Deck, Heading, Image, Link, Notes, Slide, Text } from 'spectacle';
// Import theme
import createTheme from 'spectacle/lib/themes/default';
import styled from 'react-emotion';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: '#1F2022',
    secondary: '#03A9FC',
    tertiary: '#FFE066',
    quaternary: 'white',
  },
  // {
  //   primary: '#50514F',
  //   secondary: '#F25F5C',
  //   tertiary: '#70C1B3',
  //   quaternary: '#FFE066',
  // },
  {
    primary: 'Helvetica',
    secondary: {
      name: 'Droid Serif',
      googleFont: true,
      styles: ['400', '700i']
    }
  }
);

const structureCode = `it('should test something', () => {
  // given
  renderedComponentWithUser();
  
  // when
  searchWithText('John');
  
  // then
  expect(displayedUsers()).toEqual(...);
});
`;

const implementationDetailsCode = `it('tests implementation details', () => {
  // given
  const component = renderedComponentWithUser();
  
  // when
  component.setState({searchText: 'John'})
  
  // then
  expect(component.state.displayedUsers).toEqual(...);
});
`;

const integrationCode = `it('tests from user perspective', () => {
  // given
  renderedComponentWithUser();
  
  // when
  searchWithText('John');
  
  // then
  expect(displayedUsers()).toEqual(...);
});
`;

const nonIntegrationCode = `it('tests from implementation perspective', () => {
  // given
  renderSearchComponent();
  
  // when
  searchWithText('John');
  
  // then
  expect(onChange).toHaveBeenCalledWith(...);
});
`;

const asynchronousCode = `it('deals with asynchronous code', () => {
  await someAction();
  
  // or 
  await flushPromises();
  
  // or
  jest.useFakeTimers();
  jest.advanceTimersByTime(1000);
});
`;

const currentCode = `it('should filter list of TODO items according to text input', () => {
  // given
  const initialItems = [
    'Use test driven development',
    'Write the test',
    'Write the implementation',
    'Refactor',
    'Have some coffee'
  ]
  const component = mountTodosPage(initialItems);
  
  // when
  component.searchTodoItemsWithText('test');
  
  // then
  expect(component.displayedTodoItems())
    .toEqual(['Use test driven development', 'Write the test']);
});
`;

const reactTestingLibraryCode = `it('should filter list of TODO items according to text input', () => {
  // given
  const initialItems = [...]
  const {getByText, getByTestId} = render(<TodosPage items={initialItems} />)
  
  // when
  fireEvent.change(getByTestId('search-input'), {
    target: {value: 'test'},
  })
  fireEvent.click(getByText('Search'));
  
  // then
  expect(getByTestId('item-1')).toEqual('Use test driven development');
});
`;

const currentDetailsCode = `it('should filter list of TODO items according to text input', () => {
  // given
  const initialItems = [...]
  const component = mountTodosPage(initialItems);
  
  // when
  component.searchTodoItemsWithText('test');
  
  // then
  expect(component.displayedTodoItems()).toEqual(['Use test driven development', 'Write the test']);
});

const mountTodosPage = (items) => 
    mountWithCustomWrappers(<TodosPage items={items}/>, wrapperForTodosSearch, wrapperForTodosList);

const wrapperForTodosSearch = (component) => ({
    searchTodoItemsWithText: (text) => {
        component.findByDataTest('search-input').typeText(text);
        component.findByText('Search').click();
    }
})

const wrapperForTodosList = (component) => ({
    displayedTodoItems: () => component.findByDataTest('todo-item').map(el => el.text())
})
`;

const currentWithoutWrappersCode = `it('should filter list of TODO items according to text input', () => {
  // given
  const initialItems = [...]
  const component = mount(<TodosPage items={initialItems} />);
  
  // when
  component.find('[data-test="search-input"]').simulate('change', {target : {value: 'test'}});
  component.find('[data-test="search-input-button"]').simulate('click');
  
  // then
  expect(component.find('[data-test="todo-item"]').map(el => el.text()))
    .toEqual(['Use test driven development', 'Write the test']);
});
`;

const currentWithoutWrappersExtractedFunctionsCode = `it('should filter list of TODO items according to text input', () => {
  // given
  const initialItems = [
    'Use test driven development',
    'Write the test',
    'Write the implementation',
    'Refactor',
    'Have some coffee'
  ]
  const component = mount(<TodosPage items={initialItems} />);
  
  // when
  searchTodoItemsWithSearch(component, 'test');
  
  // then
  expect(component.find('[data-test="todo-item"]').map(el => el.text()))
    .toEqual(['Use test driven development', 'Write the test']);
});

const searchTodoItemsWithSearch = (component, text) => {
  component.find('[data-test="search-input"]').simulate('change', {target : {value: text}});
  component.find('[data-test="search-input-button"]').simulate('click');
}
`;

const reduxIntegrationCode = `it('tests with redux integration', () => {
  // given
  const initialState = ...
  const store = createStoreForTest({initialState});
  const component = mount(<Provider store={store}><MyComponent /></Provider>);
  
  // when
  component.searchTodoItemsWithText('test');
  
  // then
  expect(component.displayedTodoItems()).toEqual(...);
});

const createStoreForTest = ({initialState, ...}) => {
    return createStore(reducers, initialState, enhancer); // Real reducers!
}
`;

const shallowFirstCode = `const MyComponent = ({items}) => (
    <div>
        <div>...</div>
        <ul>
        {items.map(item => (<li className="item">{item}</li>))}
        </ul>
    </div>
)

it('should render items', () => {
  // given
  const items = [1, 2, 3, 4]
  
  //when
  const component = shallow(<MyComponent items={items}/>);
  
  // then
  expect(component.find('.item').length).toEqual(4);
});
`;

const shallowWrongCode = `const Item = ({value}) => (
    <li className="item">{value}</li>
)

const MyComponent = ({items}) => (
    <div>
        <div>...</div>
        <ul>
        {items.map(item => <Item value={item}/>)}
        </ul>
    </div>
)

it('should render items', () => {
  // given
  const items = [1, 2, 3, 4]
  
  //when
  const component = shallow(<MyComponent items={items}/>);
  
  // then
  expect(component.find('.item').length).toEqual(4); // Oops... actual 0 :(
});
`;

const componentNameFindCode = `component.find(MyComponent);
// or
component.find('MyComponent');
`;

const angularCode = `it('should be invalid when application name contains special characters', () => {
  const component = getApplicationWizardComponent();

  component.perform(
    type('xy*z').in(applicationNameInput()),
    blur.from(applicationNameInput())
  );

  component.verify(
    expectThat.textOf(applicationNameError())
      .contains('Application name cannot contain any special characters')
  );
});
`;


const MyHeading = styled(Heading)`
  margin-bottom: 50px;
`;

const MySlide = styled(Slide)`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
        contentWidth={1280}
        progress={'bar'}
      >
        <Slide transition={['slide']} bgColor="primary" size={2} fit bold>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Testing Front-End Applications
          </Heading>
          <Text margin="40px 0 40px" textColor="quaternary">
            Jakub Janczyk
          </Text>

          <div className={'displayFlex alignCenter'}>
            <Image src={'front-end-connect.png'} margin={'auto'} textAlign="center" className={'displayFlex'} />
          </div>
        </Slide>

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading caps size={3} textColor="secondary">
            About me
          </MyHeading>
          <Appear><Text textColor="quaternary" textAlign="center">Living and Working in Warsaw</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">
            <div className={'displayFlex alignCenter justifyCenter'}>
              Developer @
              <Image src={'pragma-logo.png'} height={35} margin={0} className={'pragma-logo'} />
            </div>
          </Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Clean Code & TDD practitioner</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">3000+ Front-end tests in last year</Text></Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Why am I testing?
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Confidence
          </MyHeading>
          <Appear><Text textColor="quaternary" textAlign="center">In working application</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">When doing refactoring</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">When adding new features</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Within a team</Text></Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Time saving
          </Heading>
        </MySlide>


        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="secondary" caps>*/}
        {/*Characteristics of a good test*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<MyHeading size={3} textColor="secondary" caps>*/}
        {/*Clean and Readable Tests*/}
        {/*</MyHeading>*/}
        {/*<Text size={6} textColor="quaternary">*/}
        {/*We read code more often than we write it*/}
        {/*</Text>*/}
        {/*</MySlide>*/}
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<MyHeading size={3} textColor="tertiary" caps>*/}
        {/*Well Structured*/}
        {/*</MyHeading>*/}
        {/*<Appear>*/}
        {/*<div><CodePane lang={'javascript'} source={structureCode} /></div>*/}
        {/*</Appear>*/}
        {/*</MySlide>*/}
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*One assertion per test*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*Stable*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}

        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Test smells
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Manual Testing
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            In pursuit of 100% coverage
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Testing implementation details
          </MyHeading>
          <Appear>
            <div><CodePane lang={'javascript'} source={implementationDetailsCode} /></div>
          </Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Avoid rewriting tests when implementation changed
          </Heading>
          <Notes>
            Unless you change a requirement, you should not be touching your tests while refactoring (maybe only to make
            it cleaner). It’s a recepie for a disaster in a long run
          </Notes>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          {/*<video src={'collapsing_shelves.webm'} loop={true} autoPlay={true} style={{height: '70vh'}} />*/}
          <video src={'jenga.mp4'} loop={true} autoPlay={true} style={{ height: '70vh' }} />
          {/*<Image src={'domino.gif'} loop={true} autoPlay={true} style={{height: '70vh'}} />*/}
          <Notes>
            Really sad what happened to this kid, but it would be even worse if something like this would happen to you when fixing yet another test
          </Notes>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Image src={'tweet.png'} />
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            TDD
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            TDD cycle
          </MyHeading>
          <Image src={'tdd_cycle.png'} height={400} />
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            TDD Advantages
          </MyHeading>
          <Appear><Text textColor="quaternary" textAlign="left">Confidence</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Code Coverage</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Design Tool - Test as a user of an
            application</Text></Appear>
          <Notes>
            TDD let’s you write your tests from perspective of a user. If you follow that rule, you wouldn’t be testing
            implementation details. You can’t because you don’t know them, as they are not written yet.
            <br />
            <br />
            Users of your application don’t know anything, or they don’t care what’s your implementation, only if the
            application is working. The same is true with tests
          </Notes>
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            Testing boundaries
          </MyHeading>
          <Appear><Text textColor="quaternary" textAlign="left">Unit</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Integration</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Functional</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">End-to-end</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">...</Text></Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Aim for integration tests
          </MyHeading>
          <Appear><Text textColor="quaternary" textAlign="left">Application level</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Page level</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Multiple components level</Text></Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Test from a perspective of a user
          </Heading>
          <Notes>
            <div>Thinking of yourself as a user of application is the best way to create better tests.</div>
            <br />
            <div>As close the test reflects how user uses application - the better</div>
          </Notes>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={integrationCode} />
          <Notes>
            I don’t care if it’s done in internal state, redux, on server or what functions are called.
            By testing our application from a user’s perspective, you don’t test implementation details.
          </Notes>
        </MySlide>
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<CodePane lang={'javascript'} source={nonIntegrationCode} />*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<MyHeading size={3} textColor="tertiary" caps>*/}
        {/*Not only integration*/}
        {/*</MyHeading>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="center">Most of tests - integrations</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="center">Unit tests still present - e.g. corner*/}
        {/*cases</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="center">Write high-level integration tests - go down with unit*/}
        {/*tests to implement the feature</Text></Appear>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<video src={'integration.mp4'} autoPlay={true} loop={true} style={{ height: '70vh' }} />*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="secondary" caps>*/}
        {/*Mocking*/}
        {/*</Heading>*/}

        {/*<Appear><Text textColor="quaternary" textAlign="left">Avoid when possible</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">Few exceptions, e.g. HTTP requests</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">3rd party - Try to interact with external components</Text></Appear>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="secondary" caps>*/}
        {/*Downside - speed of tests*/}
        {/*</Heading>*/}

        {/*<Appear><Text textColor="quaternary" textAlign="left">I prefer confidence over few saved seconds.</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">In one of the projects - 2000 tests were running in about a minute</Text></Appear>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="secondary" caps>*/}
        {/*FE Testing challenges*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*DOM Integration*/}
        {/*</Heading>*/}

        {/*<Appear><Text textColor="quaternary" textAlign="left">JSDOM - FTW!</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">Lacking support for elements sizing :(</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">Possible with mocking - one of the*/}
        {/*exceptions</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">Alternative - extract code operating on DOM to function*/}
        {/*and test it</Text></Appear>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*DOM Integration - Example*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*Asynchronous environment*/}
        {/*</Heading>*/}

        {/*<Appear><Text textColor="quaternary" textAlign="left">Everything is asynchronous: requests, callbacks, event*/}
        {/*listeners, timers...</Text></Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">Solution: JEST + async/await</Text></Appear>*/}
        {/*<Appear>*/}
        {/*<div><CodePane lang={'javascript'} source={asynchronousCode} /></div>*/}
        {/*</Appear>*/}
        {/*</MySlide>*/}


        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Our road to better React and Enzyme tests
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Our test currently
          </Heading>
          <Appear>
            <div className={'displayFlex fullWidth'}><CodePane className={'smallerCode'} lang={'javascript'}
                                                               source={currentCode} /></div>
          </Appear>
          <Notes>
            Just by looking at this code you probably cannot say if it’s written in React, Angular or any other
            framework. What you can say, at least I hope, is that this test clearly says what it’s about.
            <br />
            <br />
            Are we using any component for list or search input? How do we filter data? Are we using Redux or internal
            state? Those, and many more things are not that important at this level.
          </Notes>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            (Almost) all our mistakes
          </Heading>
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Mistake no. 1 - Shallow rendering from Enzyme
          </MyHeading>
          <Notes>
            I am writing my tests using Enzyme, and it is great library. However, it has few features that can encourage
            bad testing practices.
            You are not testing functionality, but rather that we provided prop x or called funstion y - not something
            that user would observe.
          </Notes>

          <Appear><Text textColor="quaternary" textAlign="center">Ways to render a component - shallow, full or
            static</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Shallow does not render nested
            components</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Testing implementation details!</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Hard to refactor</Text></Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={shallowFirstCode} />
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} className={'smallerCode'} source={shallowWrongCode} />
        </MySlide>
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<MyHeading size={3} textColor="tertiary" caps>*/}
        {/*<Code textSize={'1em'} textColor="tertiary">.shallow()</Code> to the rescue?*/}
        {/*</MyHeading>*/}

        {/*<Appear>*/}
        {/*<div className={'displayFlex fullWidth'}><CodePane lang={'javascript'}*/}
        {/*source={'component.shallow().shallow().shallow().shallow().shallow().shallow();'} />*/}
        {/*</div>*/}
        {/*</Appear>*/}
        {/*<Appear>*/}
        {/*<div className={'displayFlex fullWidth'}><CodePane lang={'javascript'} source={'shallowUpTo(Component);'} /></div>*/}
        {/*</Appear>*/}
        {/*</MySlide>*/}
        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Always render everything!
          </Heading>
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Mistake no. 2 - ways of querying elements
          </MyHeading>

          <Notes>
            how user finds elements, and do the same in tests
            <br />
            <br />
            Not testing from user perspective
          </Notes>
          <Appear>
            <div><CodePane lang={'javascript'} source={componentNameFindCode} /></div>
          </Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Implementation detail!</Text></Appear>
          <Appear>
            <div><Text textColor="quaternary" textAlign="center">Use real texts to find elements, or at least some
              custom attribute (like data-test)</Text></div>
          </Appear>
        </MySlide>

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<MyHeading size={3} textColor="tertiary" caps>*/}
        {/*Mistake no. 3 - Accessing internal state*/}
        {/*</MyHeading>*/}

        {/*<Appear>*/}
        {/*<div><CodePane lang={'javascript'} source={implementationDetailsCode} /></div>*/}
        {/*</Appear>*/}
        {/*<Appear><Text textColor="quaternary" textAlign="left">What if we change name or remove a*/}
        {/*state?</Text></Appear>*/}
        {/*</MySlide>*/}

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Mistake no. 3 - not testing integration with Redux
          </MyHeading>

          <Appear><Text textColor="quaternary" textAlign="center">Testing reducers, selectors, components
            separately?</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Better to test it all at once!</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Also applicable to Router, I18N or
            other contexts</Text></Appear>
          <Notes>
            Not testing from user perspective
          </Notes>
        </MySlide>

        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<CodePane lang={'javascript'} source={reduxIntegrationCode} />*/}
        {/*</MySlide>*/}

        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            Custom Wrappers
          </MyHeading>

          <Appear>
            <div><CodePane className={'smallerCode'} lang={'javascript'} source={currentCode} /></div>
          </Appear>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={currentWithoutWrappersCode} />
        </MySlide>
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<CodePane lang={'javascript'} className={'smallerCode'} source={currentWithoutWrappersExtractedFunctionsCode} />*/}
        {/*</MySlide>*/}
        <MySlide transition={['slide']} bgColor="primary">
          <CodePane className={'smallerCode'} lang={'javascript'} source={currentDetailsCode} />
          <Notes>
            There is no magic, just plain JS functions and objects, that let you define your own DSL
            <br />
            <br />
            methods to reduce the boilerplate
          </Notes>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            enzyme-custom-wrappers
          </MyHeading>

          <Link href={'https://github.com/jakubjanczyk/enzyme-custom-wrappers'}
                textColor="tertiary">https://github.com/jakubjanczyk/enzyme-custom-wrappers</Link>
        </MySlide>


        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            React-testing-library
          </MyHeading>
          <Link href={'https://github.com/kentcdodds/react-testing-library'}
                textColor="tertiary">https://github.com/kentcdodds/react-testing-library</Link>

          <Appear>
            <div className={'testing-library-code'}><CodePane lang={'javascript'} className={'smallerCode'}
                                                              source={reactTestingLibraryCode} /></div>
          </Appear>
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Other Frameworks
          </Heading>
        </MySlide>
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="tertiary" caps>
            Angular
          </MyHeading>
          <Appear>
            <div className={'ng-runner-link'}>
              <Text textColor="quaternary" textAlign="center">ng-test-runner</Text>
              <Link href={'https://github.com/Pragmatists/ng-test-runner'}
                    textColor="tertiary">https://github.com/Pragmatists/ng-test-runner</Link>
            </div>
          </Appear>

          <Appear>
            <div><CodePane lang={'javascript'} className={'smallerCode'} source={angularCode} /></div>
          </Appear>
        </MySlide>
        {/*<MySlide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*Vue*/}
        {/*</Heading>*/}
        {/*</MySlide>*/}
        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            dom-testing-library
          </MyHeading>

          <Link href={'https://github.com/kentcdodds/dom-testing-library'}
                textColor="tertiary">https://github.com/kentcdodds/dom-testing-library</Link>
        </MySlide>


        <MySlide transition={['slide']} bgColor="primary">
          <MyHeading size={3} textColor="secondary" caps>
            Rules
          </MyHeading>

          <Appear><Text textColor="quaternary" textAlign="center">Use TDD</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Do not test implementation details</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Write integration tests when possible</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Always render everything</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="center">Verify actual HTML output</Text></Appear>
        </MySlide>

        <MySlide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Thank You!
          </Heading>
        </MySlide>
      </Deck>
    );
  }
}
