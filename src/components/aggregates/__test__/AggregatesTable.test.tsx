import { fireEvent, RenderResult, waitFor, screen } from '@testing-library/react';
import apiRequests from '../../../api/apiRequests';
import { aggregates_list } from '../../../api/mock_agg_response';
import AggregatesTable from '../AggregatesTable';
import { renderWithProviders } from '../../../__tests__/testReducer';
import { ConfirmationProvider } from '../../confirmationDialog/ConfirmationProvider';
import { formatDate } from '../../../helpers/formatter.utility';
import * as router from 'react-router'
import * as routes from '../../../navigation/routes';
import { getAggregatesResponse } from '../../../api/apiRequestTypes';

const navigate = jest.fn();

describe("AggregatesTable Component", () => {
    
    let result: RenderResult | undefined;
    
    let mockData = {...aggregates_list} as getAggregatesResponse;
    let formattedData = mockData.items.map(
        (agg) => ({...agg, createdAt: formatDate(agg.createdAt, true), lastUpdate: agg.lastUpdate ? formatDate(agg.lastUpdate, true) : ``}) 
    );
    mockData.items = formattedData;

    beforeEach(async () => {
        // mock api
        let apiSpyGetAggregates = jest.spyOn(apiRequests, 'getAggregates');
        apiSpyGetAggregates.mockImplementation((params) => {
            if(params.name !== "") {
                let filteredItems = mockData.items.filter((agg) => agg.name === params.name);
                return Promise.resolve({
                    ...mockData,
                    items: filteredItems
                })
            }

            return Promise.resolve(mockData)
        });

        let apiSpyDeleteAggregate = jest.spyOn(apiRequests, 'deleteAggregate');
        apiSpyDeleteAggregate.mockImplementation((id) => {
            return Promise.resolve(id);
        })

        // mock navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('renders aggregates table', async () => {
        result = renderWithProviders(<ConfirmationProvider><AggregatesTable /></ConfirmationProvider>);

        const filterForm = result?.container.querySelector('form');
        expect(filterForm).toBeInTheDocument();
        const aggregatesTable = screen.getByRole('table');
        expect(aggregatesTable).toBeInTheDocument();
        const pageSelector = result?.queryByTestId('pageSelector');
        expect(pageSelector).toBeInTheDocument();
        await waitFor(() => {
            //Aggregates fetched and displayed
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(10)
        })
    });

    it("filter single aggregate by name", async() => {
        let result = renderWithProviders(<ConfirmationProvider><AggregatesTable /></ConfirmationProvider>)

        const aggregateNameInput = screen.getByRole("textbox", {name: "Nome aggregazione"});
        let firstAggregateName = mockData.items[0].name; 
        fireEvent.change(aggregateNameInput, { target : {value : firstAggregateName} });
        fireEvent.click(screen.getByRole("button", {name: "Filtra"}));
        await waitFor(() => {
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(1);
            expect(screen.getByText(firstAggregateName)).toBeInTheDocument();
        })
    })

    it('handle click on column', async () => {
        let result = renderWithProviders(<ConfirmationProvider><AggregatesTable /></ConfirmationProvider>)
        await waitFor(() => {
            //Aggregates fetched and displayed
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(10)
        })
        const firstTd = result?.container.querySelector('tbody tr:first-child td:first-child');
        expect(firstTd).toBeInTheDocument();
        fireEvent.click(firstTd!);
        await waitFor(() => expect(navigate).toBeCalledWith(routes.GET_UPDATE_AGGREGATE_PATH(mockData.items[0].id)));
    })

    // it('changes items per page', async () => {
    //     result = renderWithProviders(<ConfirmationProvider><AggregatesTable /></ConfirmationProvider>)
    //     const itemsPerPageSelectorBtn = result?.container.querySelector(
    //       '[data-testid="itemsPerPageSelector"] > button'
    //     );
    //     fireEvent.click(itemsPerPageSelectorBtn!);
    //     const itemsPerPageDropdown = await waitFor(() => screen.queryByRole('presentation'));
    //     expect(itemsPerPageDropdown).toBeInTheDocument();
    //     const itemsPerPageItem = within(itemsPerPageDropdown!).queryByText('100');
    //     fireEvent.click(itemsPerPageItem!);
    //     await waitFor(() => expect(mockApiFn).toBeCalledWith({
    //         name: "",
    //         limit: 100,
    //         lastEvaluatedId: "",
    //         lastEvaluatedName: ""
    //     }))
    // });

    it('delete aggregate', async () => {
        let result = renderWithProviders(<ConfirmationProvider><AggregatesTable /></ConfirmationProvider>)

        await waitFor(() => {
            //Aggregates fetched and displayed
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(10)
        })
        const lastTd = result?.container.querySelector('tbody tr:first-child td:last-child');
        expect(lastTd).toBeInTheDocument();
        fireEvent.click(lastTd!);

        //Confirmation modal opened
        await waitFor(() => expect("Elimina aggregazione"))

        const confirmButton = await waitFor(() => screen.getByRole("button", {name : "Conferma"}));
        fireEvent.click(confirmButton);
        await waitFor(() => {
            //Aggregates refetched and displayed
            expect(result?.container.querySelectorAll("tbody tr")).toHaveLength(10)
        })
    })
})