import { reducer } from "../../../../mocks/mockReducer";
import {cleanup, fireEvent, screen, act, waitFor} from "@testing-library/react";
import React from "react";
import { CostsForm } from "../CostsForm";
import { Cost } from "../../../../model";
import * as paperChannelApi from "../../../../api/paperChannelApi";
import { CapDto, CapResponseDto } from "../../../../api/paperChannel";
import {COST_TYPE} from "../fields";
import * as reactRedux from "../../../../redux/hook";
import {AxiosError, AxiosResponse} from "axios";

const nationalCost = {
  type: "NATIONAL",
  nationalProductType: "AR",
  internationalProductType: undefined,
  price: 123,
  priceAdditional: 456,
  cap: ["01234", "56789"],
  zone: undefined
} as Cost

const internationalCost = {
  type: "INTERNATIONAL",
  nationalProductType: undefined,
  internationalProductType: "AR",
  price: 123,
  priceAdditional: 456,
  cap: undefined,
  zone: "ZONE_1"
} as Cost


const capResponse = {
   content: [{
     cap: "21034"
   }as CapDto]
} as CapResponseDto

describe("CostsForm Test", () => {
  const saveMockFn = jest.fn();
  const dispatchMockFn = jest.fn();
  const retrieveCapsMockFn = jest.fn();
  const createCostMockFn = jest.fn((tender:string, driver:string, cost:any) => Promise.resolve())
  const retrieveCapsSpy = jest.spyOn(paperChannelApi, "retrieveCaps");
  const createCostSpy = jest.spyOn(paperChannelApi, "createCost");

  beforeEach(() => {
    const dispatchSpy = jest.spyOn(reactRedux, "useAppDispatch");
    dispatchSpy.mockReturnValue(dispatchMockFn);
    retrieveCapsSpy.mockImplementation(retrieveCapsMockFn);
    retrieveCapsSpy.mockResolvedValue(capResponse);
    createCostSpy.mockImplementation(createCostMockFn);
  });

  afterEach(cleanup);


  it('whenNewCostThenRenderOnlySelectType', async function () {
    reducer(<CostsForm fsu={true}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)
    const inputs = screen.queryAllByRole("textbox");
    expect(inputs.length).toEqual(0)

    const [buttonSelect, buttonCancel, buttonSave] = screen.getAllByRole("button");
    expect(buttonSelect).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
    expect(buttonSave).toBeInTheDocument();

    fireEvent.mouseDown(buttonSelect);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const options = screen.getAllByRole("option");
      await expect(options.length).toEqual(2);
      await expect(options[0].textContent).toEqual(COST_TYPE[0].label);
      await expect(options[1].textContent).toEqual(COST_TYPE[1].label);
    })
  });

  it('whenChooseNationalCostTypeThenCapAutocompleteIsRendered', async function () {
    reducer(<CostsForm fsu={true}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)
    const select = screen.getByTestId("typeCost-select-custom")
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.change(select.children[1], {
      target: {
        value: COST_TYPE[0].key
      }
    })

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act( async () => {
      const inputs = screen.getAllByRole("textbox");
      await expect(inputs.length).toEqual(2);
      expect(screen.getByTestId("caps-autocomplete")).toBeInTheDocument()
    })
  });

  it('whenHaveInitialCostNationalThenShowData', async function () {
    reducer(<CostsForm fsu={true}
                       cost={nationalCost}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const select = screen.getByTestId("typeCost-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1].getAttribute("value")).toEqual(nationalCost.type)

      const selectProductType = screen.getByTestId("nationalProductType-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1].getAttribute("value")).toEqual(nationalCost.nationalProductType)

      const [basePrice, additionalPrice] = screen.getAllByRole("textbox");
      await expect(basePrice.getAttribute("value")).toEqual(nationalCost.price+"")
      await expect(additionalPrice.getAttribute("value")).toEqual(nationalCost.priceAdditional+"")

    })
  });

  it('whenHaveInitialCostInternationalThenShowData', async function () {
    reducer(<CostsForm fsu={true}
                       cost={internationalCost}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const select = screen.getByTestId("typeCost-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(select.children[1].getAttribute("value")).toEqual(internationalCost.type)

      const selectProductType = screen.getByTestId("internationalProductType-select-custom");
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1]).toBeInTheDocument()
      // eslint-disable-next-line testing-library/no-node-access
      await expect(selectProductType.children[1].getAttribute("value")).toEqual(internationalCost.internationalProductType)

      const [basePrice, additionalPrice] = screen.getAllByRole("textbox");
      await expect(basePrice.getAttribute("value")).toEqual(internationalCost.price+"")
      await expect(additionalPrice.getAttribute("value")).toEqual(internationalCost.priceAdditional+"")

    })
  });

  it('whenEditDataThenSaved', async function () {
    reducer(<CostsForm fsu={true}
                       cost={internationalCost}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const [basePrice, ] = screen.getAllByRole("textbox");
      fireEvent.change(basePrice, {
        target: {
          value: "1,34"
        }
      })
      await expect(basePrice.getAttribute("value")).toEqual("1,34")
      const btnSave = screen.getByTestId("btn-save-cost");
      fireEvent.click(btnSave);

      await waitFor(async () => {
        await expect(createCostMockFn).toBeCalledTimes(1);
        await expect(createCostMockFn).toBeCalledWith(
          "1234", "123-driver", {
            uid: undefined,
            price: 1.34,
            priceAdditional: internationalCost.priceAdditional,
            zone: internationalCost.zone,
            cap: undefined,
            productType: internationalCost.internationalProductType
          }
        )
      })


    })
  });

  it('whenEditDataThrowError', async function () {

    const response = {
      status: 400,
      data: {
        detail: "Errore durante il salvataggio"
      }
    } as AxiosResponse
    createCostSpy.mockRejectedValue(new AxiosError("Error request", "400", undefined, undefined, response))


    reducer(<CostsForm fsu={true}
                       cost={internationalCost}
                       tenderCode={"1234"}
                       driverCode={"123-driver"}
                       onSave={saveMockFn}/>)

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const [basePrice, ] = screen.getAllByRole("textbox");
      fireEvent.change(basePrice, {
        target: {
          value: "1,34"
        }
      })
      await expect(basePrice.getAttribute("value")).toEqual("1,34")
      const btnSave = screen.getByTestId("btn-save-cost");
      fireEvent.click(btnSave);

      await waitFor(async () => {
        await expect(dispatchMockFn).toBeCalledWith({
          payload: true,
          type: "snackbar/updateSnackbacrOpened"
        })
        await expect(dispatchMockFn).toBeCalledWith({
          payload: response.status,
          type: "snackbar/updateStatusCode"
        })
        await expect(dispatchMockFn).toBeCalledWith({
          payload: response.data.detail,
          type: "snackbar/updateMessage"
        })
      })


    })
  });


})