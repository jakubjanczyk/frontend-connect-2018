// Import React
import React from 'react';
// Import Spectacle Core tags
import { Appear, CodePane, Deck, Heading, List, ListItem, Slide, Text, Code, Image, Link } from 'spectacle';
// Import theme
import createTheme from 'spectacle/lib/themes/default';

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

const asynchronousCode = `it('deals with asynchronous code', async () => {
  await someAction();
  
  // or 
  await flushPromises();
  
  // or
  jest.useFakeTimers();
  jest.advanceTimersByTime(1000);
});
`;

const currentCode = `it('should filter list of TODO items according to text input', async () => {
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
  expect(component.displayedTodoItems()).toEqual(['Use test driven development', 'Write the test']);
});
`;

const reactTestingLibraryCode = `it('should filter list of TODO items according to text input', async () => {
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

const currentDetailsCode = `it('should filter list of TODO items according to text input', async () => {
  // given
  const initialItems = [...]
  const component = mountTodosPage(initialItems);
  
  // when
  component.searchTodoItemsWithText('test');
  
  // then
  expect(component.displayedTodoItems()).toEqual(['Use test driven development', 'Write the test']);
});

const mountTodosPage = (items) => mountWithCustomWrappers(<TodosPage items={items}/>, wrapperForTodosSearch, wrapperForTodosList);

const wrapperForTodosSearch = (component) => {
    return {
        searchTodoItemsWithText: (text) => {
            component.findByDataTest('search-input').typeText(text);
            component.findByText('Search').click();
        }
        ... // possibly more methods
    }
}
const wrapperForTodosList = (component) => {
    return {
        displayedTodoItems: () => component.findByDataTest('todo-item').map(el => el.text())
    }
}
`;

const currentWithoutWrappersCode = `it('should filter list of TODO items according to text input', async () => {
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
  component.find('[data-test="search-input"]').simulate('change', {target : {value: 'test'}});
  component.find('[data-test="search-input-button"]').simulate('click');
  
  // then
  expect(component.find('[data-test="todo-item"]').map(el => el.text()))
    .toEqual(['Use test driven development', 'Write the test']);
});
`;

const currentWithoutWrappersExtractedFunctionsCode = `it('should filter list of TODO items according to text input', async () => {
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

const reduxIntegrationCode = `it('tests with redux integration', async () => {
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

const shallowFirstCode = `
const MyComponent = ({items}) => (
    <div>
        <div>...</div>
        <ul>
        {items.map(item => (<li className="item">{item}</li>))}
        </ul>
    </div>
)

it('should render items', async () => {
  // given
  const items = [1, 2, 3, 4]
  
  //when
  const component = shallow(<MyComponent items={items}/>);
  
  // then
  expect(component.find('.item').length).toEqual(4);
});
`;

const shallowWrongCode = `
const Item = ({value}) => (
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

it('should render items', async () => {
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

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
        contentWidth={'1200px'}
      >
        <Slide transition={['slide']} bgColor="primary" size={2} fit bold>
          <Heading size={1} caps lineHeight={1} textColor="secondary">
            Testing Front-End Applications
          </Heading>
          <Text margin="40px 0 0" textColor="quaternary">
            Jakub Janczyk
          </Text>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading caps textColor="secondary">
            About me
          </Heading>
          <Appear><Text textColor="quaternary" textAlign="left">Living and Working in Warsaw</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Developer @ Pragmatists</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Software Craftsmanship follower & TDD enthusiast</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">3000+ Front-end tests in last 1.5 year</Text></Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Why am I testing?
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Confidence
          </Heading>
          <List textColor="quaternary">
            <ListItem>Working application</ListItem>
            <ListItem>Refactoring</ListItem>
            <ListItem>New Features</ListItem>
            <ListItem>Inside a team</ListItem>
          </List>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Faster Development
          </Heading>
        </Slide>


        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Characteristics of a good test
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Clean and Readable
          </Heading>
          <Text size={6} textColor="quaternary">
            We read code more often than we write it
          </Text>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Well Structured
          </Heading>
          <Appear>
            <div><CodePane lang={'javascript'} source={structureCode} /></div>
          </Appear>
        </Slide>
        {/*<Slide transition={['slide']} bgColor="primary">*/}
        {/*<Heading size={3} textColor="tertiary" caps>*/}
        {/*One assertion per test*/}
        {/*</Heading>*/}
        {/*</Slide>*/}
        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="tertiary" caps>*/}
            {/*Stable*/}
          {/*</Heading>*/}
        {/*</Slide>*/}

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Test smells
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Manual Testing
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            In pursuit of 100% coverage
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Testing implementation details
          </Heading>
          <Appear>
            <div><CodePane lang={'javascript'} source={implementationDetailsCode} /></div>
          </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Avoid rewriting tests when implementation changed
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          {/*<video src={'collapsing_shelves.webm'} loop={true} autoPlay={true} style={{height: '70vh'}} />*/}
          <video src={'jenga.mp4'} loop={true} autoPlay={true} style={{height: '70vh'}} />
          {/*<Image src={'domino.gif'} loop={true} autoPlay={true} style={{height: '70vh'}} />*/}
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Image src={'tweet.png'} />
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            TDD
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            TDD cycle
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            TDD Advantages
          </Heading>
          <Appear><Text textColor="quaternary" textAlign="left">Confidence</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Code Coverage</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Design Tool - Test as a user of
            application</Text></Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Testing boundaries
          </Heading>
          <Appear><Text textColor="quaternary" textAlign="left">Unit</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Integration</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Functional</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">End-to-end</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">...</Text></Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Aim for integration tests
          </Heading>

          <Appear>
            <div>
              <Text textColor="quaternary" textAlign="left">Integration on different level</Text>
              <List textColor="quaternary">
                <ListItem>Application</ListItem>
                <ListItem>Page</ListItem>
                <ListItem>Several Components</ListItem>
              </List>
            </div>
          </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Test from a perspective of a user
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={integrationCode} />
        </Slide>
        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<CodePane lang={'javascript'} source={nonIntegrationCode} />*/}
        {/*</Slide>*/}

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Not only integration tests
          </Heading>
          <Appear><Text textColor="quaternary" textAlign="left">Most of tests - integration</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Unit tests still present - e.g. corner
            cases</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Write high-level integration tests - go down with unit
            tests to implement the feature</Text></Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <video src={'integration.mp4'} autoPlay={true} loop={true} style={{height: '70vh'}} />
        </Slide>

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="secondary" caps>*/}
            {/*Mocking*/}
          {/*</Heading>*/}

          {/*<Appear><Text textColor="quaternary" textAlign="left">Avoid when possible</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">Few exceptions, e.g. HTTP requests</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">3rd party - Try to interact with external components</Text></Appear>*/}
        {/*</Slide>*/}

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="secondary" caps>*/}
            {/*Downside - speed of tests*/}
          {/*</Heading>*/}

          {/*<Appear><Text textColor="quaternary" textAlign="left">I prefer confidence over few saved seconds.</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">In one of the projects - 2000 tests were running in about a minute</Text></Appear>*/}
        {/*</Slide>*/}

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="secondary" caps>*/}
            {/*FE Testing challenges*/}
          {/*</Heading>*/}
        {/*</Slide>*/}

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="tertiary" caps>*/}
            {/*DOM Integration*/}
          {/*</Heading>*/}

          {/*<Appear><Text textColor="quaternary" textAlign="left">JSDOM - FTW!</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">Lacking support for elements sizing :(</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">Possible with mocking - one of the*/}
            {/*exceptions</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">Alternative - extract code operating on DOM to function*/}
            {/*and test it</Text></Appear>*/}
        {/*</Slide>*/}

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="tertiary" caps>*/}
            {/*DOM Integration - Example*/}
          {/*</Heading>*/}
        {/*</Slide>*/}

        {/*<Slide transition={['slide']} bgColor="primary">*/}
          {/*<Heading size={3} textColor="tertiary" caps>*/}
            {/*Asynchronous environment*/}
          {/*</Heading>*/}

          {/*<Appear><Text textColor="quaternary" textAlign="left">Everything is asynchronous: requests, callbacks, event*/}
            {/*listeners, timers...</Text></Appear>*/}
          {/*<Appear><Text textColor="quaternary" textAlign="left">Solution: JEST + async/await</Text></Appear>*/}
          {/*<Appear>*/}
            {/*<div><CodePane lang={'javascript'} source={asynchronousCode} /></div>*/}
          {/*</Appear>*/}
        {/*</Slide>*/}


        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Our road to better React + Enzyme tests
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Our test currently
          </Heading>
          <Appear>
            <div><CodePane lang={'javascript'} source={currentCode} /></div>
          </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            (Almost) all our mistakes
          </Heading>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Mistake no. 1 - Shallow rendering from Enzyme
          </Heading>

          <Appear><Text textColor="quaternary" textAlign="left">Three ways to render component - shallow, full or static
            render</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Shallow does not render nested
            components</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Testing implementation details!</Text></Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={shallowFirstCode} />
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={shallowWrongCode} />
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            <Code textSize={'1em'} textColor="tertiary">.shallow()</Code> to the rescue?
          </Heading>

          <Appear><Text textColor="quaternary" textAlign="left">DON'T!</Text></Appear>
          <Appear>
          <div><CodePane lang={'javascript'} source={'component.shallow().shallow().shallow().shallow().shallow().shallow().shallow();'} /></div>
        </Appear>
          <Appear>
          <div><CodePane lang={'javascript'} source={'shallowUpTo(Component);'}/> </div>
        </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Always render everything!
          </Heading>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Mistake no. 2 - Finding elements by incorrect attributes
          </Heading>

          <Appear><Text textColor="quaternary" textAlign="left">Enzyme let's you fins element by Component name or type</Text></Appear>
          <Appear>
            <div><CodePane lang={'javascript'} source={componentNameFindCode} /></div>
          </Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Implementation detail!</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Using id or class name - error prone or impossible - e.g. when using CSS Modules or Styled Components</Text></Appear>
          <Appear><div><Text textColor="quaternary" textAlign="left">Use actual text, or labels to find element, or if not possible, some custom attribute. We use data-test</Text></div></Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Mistake no. 3 - Accessing internal state
          </Heading>

          <Appear>
            <div><CodePane lang={'javascript'} source={implementationDetailsCode} /></div>
          </Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Big no, no!</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">What if we change name or remove a state?</Text></Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Mistake no. 4 - not testing integration with Redux
          </Heading>

          <Appear><Text textColor="quaternary" textAlign="left">Testing actions, reducers, selectors, components separately?</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Problem starts when state property name changed - have to change it for all pieces</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Better to test it all at once!</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Applies also in case of Router, Internationalization or other contexts</Text></Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={reduxIntegrationCode} />
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Custom Wrappers
          </Heading>

          <Appear>
            <div><CodePane lang={'javascript'} source={currentCode} /></div>
          </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={currentWithoutWrappersCode} />
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane lang={'javascript'} source={currentWithoutWrappersExtractedFunctionsCode} />
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <CodePane className={'smallerCode'} lang={'javascript'} source={currentDetailsCode} />
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
           enzyme-custom-wrappers
          </Heading>

          <Link href={'https://github.com/jakubjanczyk/enzyme-custom-wrappers'} textColor="tertiary">https://github.com/jakubjanczyk/enzyme-custom-wrappers</Link>
        </Slide>


        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            React-testing-library
          </Heading>
          <Link href={'https://github.com/kentcdodds/react-testing-library'} textColor="tertiary">https://github.com/kentcdodds/react-testing-library</Link>

          <Appear>
            <div><CodePane lang={'javascript'} source={reactTestingLibraryCode} /></div>
          </Appear>
        </Slide>

        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Other Frameworks
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Angular
          </Heading>
          <Appear>
            <div>
              <Text textColor="quaternary" textAlign="left">ng-test-runner</Text>
              <Link href={'https://github.com/Pragmatists/ng-test-runner'} textColor="tertiary">https://github.com/Pragmatists/ng-test-runner</Link>
            </div>
          </Appear>

          <Appear>
            <div><CodePane lang={'javascript'} source={angularCode} /></div>
          </Appear>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="tertiary" caps>
            Vue
          </Heading>
        </Slide>
        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            dom-testing-library
          </Heading>

          <Link href={'https://github.com/kentcdodds/dom-testing-library'} textColor="tertiary">https://github.com/kentcdodds/dom-testing-library</Link>
        </Slide>


        <Slide transition={['slide']} bgColor="primary">
          <Heading size={3} textColor="secondary" caps>
            Summary - Rules
          </Heading>

          <Appear><Text textColor="quaternary" textAlign="left">Use TDD</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Do not test implementation details</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Write integration tests when possible</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Always try to render as much as possible and avoid mocking</Text></Appear>
          <Appear><Text textColor="quaternary" textAlign="left">Verify actual HTML output and not some intermediate technologies, like JSX</Text></Appear>
        </Slide>
      </Deck>
    );
  }
}
