import {BreadcrumbCustom} from "../../components/breadcrumb/BreadcrumbCustom";
import {Box, Card, Container, Grid, Typography} from "@mui/material";

import MainLayout from "../mainLayout/MainLayout";
import React from "react";


export function FormTenderPage({email}:any) {

  return <MainLayout email={email}>
    <Container>
      <BreadcrumbCustom/>
      <Grid container direction="row" rowSpacing={3}>
        <Grid item container>
          <Box>
            <Typography variant="h4" color="text.primary">
              Nuova Gara
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
          </Card>
        </Grid>

      </Grid>
    </Container>
  </MainLayout>

}