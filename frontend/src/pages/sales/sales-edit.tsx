import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/sales/salesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditSalesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    product: null,

    quantity_sold: '',

    sale_date: new Date(),

    organization: null,

    organizations: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { sales } = useAppSelector((state) => state.sales);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof sales === 'object') {
      setInitialValues(sales);
    }
  }, [sales]);

  useEffect(() => {
    if (typeof sales === 'object') {
      const newInitialVal = { ...initVals };
      Object.keys(initVals).forEach((el) => (newInitialVal[el] = sales[el]));
      setInitialValues(newInitialVal);
    }
  }, [sales]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/sales/sales-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit sales')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit sales'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Product' labelFor='product'>
                <Field
                  name='product'
                  id='product'
                  component={SelectField}
                  options={initialValues.product}
                  itemRef={'products'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='QuantitySold'>
                <Field
                  type='number'
                  name='quantity_sold'
                  placeholder='QuantitySold'
                />
              </FormField>

              <FormField label='SaleDate'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.sale_date
                      ? new Date(
                          dayjs(initialValues.sale_date).format(
                            'YYYY-MM-DD hh:mm',
                          ),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, sale_date: date })
                  }
                />
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='Organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organizations'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <FormField label='organizations' labelFor='organizations'>
                <Field
                  name='organizations'
                  id='organizations'
                  component={SelectField}
                  options={initialValues.organizations}
                  itemRef={'organizations'}
                  showField={'name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/sales/sales-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditSalesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SALES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditSalesPage;
