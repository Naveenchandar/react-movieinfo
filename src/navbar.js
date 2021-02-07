import React from "react";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Collapse
} from "shards-react";

export default class NavExample extends React.Component {
    constructor(props) {
        super(props);

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);

        this.state = {
            dropdownOpen: false,
            collapseOpen: false
        };
    }

    toggleDropdown() {
        this.setState({
            ...this.state,
            ...{
                dropdownOpen: !this.state.dropdownOpen
            }
        });
    }

    toggleNavbar() {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen
            }
        });
    }

    render() {
        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="#">Movie World</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />

                <Collapse open={this.state.collapseOpen} navbar>
                    <Nav navbar>
                        {/* <NavItem>
                            <NavLink active href="#">Active</NavLink>
                        </NavItem>
                        <Dropdown
                            open={this.state.dropdownOpen}
                            toggle={this.toggleDropdown}
                        >
                            <DropdownToggle nav caret>
                                Languages
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>English</DropdownItem>
                                <DropdownItem>Tamil</DropdownItem>
                                <DropdownItem>Telugu</DropdownItem>
                                <DropdownItem>Malayalam</DropdownItem>
                                <DropdownItem>Kannada</DropdownItem>
                                <DropdownItem>Hindi</DropdownItem>
                            </DropdownMenu>
                        </Dropdown> */}
                        <Dropdown
                            open={this.state.dropdownOpen}
                            toggle={this.toggleDropdown}
                        >
                            <DropdownToggle nav caret>
                                Languages
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>English</DropdownItem>
                                <DropdownItem>Tamil</DropdownItem>
                                <DropdownItem>Telugu</DropdownItem>
                                <DropdownItem>Malayalam</DropdownItem>
                                <DropdownItem>Kannada</DropdownItem>
                                <DropdownItem>Hindi</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>

                    {/* <Nav navbar className="ml-auto">
                        <InputGroup size="sm" seamless>
                            <InputGroupAddon type="prepend">
                                <InputGroupText>
                                </InputGroupText>
                            </InputGroupAddon>
                            <FormInput className="border-0" placeholder="Search Movies..." />
                        </InputGroup>
                    </Nav> */}
                </Collapse>
            </Navbar>
        );
    }
}