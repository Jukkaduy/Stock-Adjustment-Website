import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/sales/salesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const SalesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { sales } = useAppSelector((state) => state.sales);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View sales')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View sales')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/sales/sales-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Product</p>

            <p>{sales?.product?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>QuantitySold</p>
            <p>{sales?.quantity_sold || 'No data'}</p>
          </div>

          <FormField label='SaleDate'>
            {sales.sale_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  sales.sale_date
                    ? new Date(
                        dayjs(sales.sale_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No SaleDate</p>
            )}
          </FormField>

          {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
            <div className={'mb-4'}>
              <p className={'block font-bold mb-2'}>Organization</p>

              <p>{sales?.organization?.name ?? 'No data'}</p>
            </div>
          )}

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>organizations</p>

            <p>{sales?.organizations?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/sales/sales-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

SalesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SALES'}>{page}</LayoutAuthenticated>
  );
};

export default SalesView;
