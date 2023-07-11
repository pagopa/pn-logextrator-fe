import MainLayout from "../mainLayout/MainLayout";
import {Box, Card, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {EstimatesTable} from "../../components/usageEstimates/EstimatesTable";
import FilterTable from "../../components/forms/filterTable/FilterTable";
import {setFilters} from "../../redux/aggregateSlice";
import {FieldsEstimatesFilter} from "../../components/formFields/FormFields";


export function SearchUsageEstimationsPage({email=""}){


  const handleFiltersSubmit = (filters: any) => {
    console.log(filters);
  }

  const fields = [FieldsEstimatesFilter["Pa Autocomplete"]];

  return <MainLayout email={email}>
    <Container>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Volumi delle notifiche
            </Typography>
          </Box>
        </Grid>
        <Grid item container direction="row" justifyContent="space-between">
          <Card
            elevation={24}
            sx={{
              width: 1,
              padding: "5%",
              boxShadow: "0px 3px 3px -2px ",
              backgroundColor: "background.paper",
            }}
          >
            <FilterTable onFiltersSubmit={handleFiltersSubmit} fields={fields} />
            <EstimatesTable/>
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>
}