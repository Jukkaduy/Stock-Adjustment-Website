import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
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

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

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
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/organizations/organizations-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.users_organizations &&
                      Array.isArray(organizations.users_organizations) &&
                      organizations.users_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.users_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Products Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Quantity</th>

                      <th>ExpiryDate</th>

                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.products_organization &&
                      Array.isArray(organizations.products_organization) &&
                      organizations.products_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/products/products-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='quantity'>{item.quantity}</td>

                          <td data-label='expiry_date'>
                            {dataFormatter.dateTimeFormatter(item.expiry_date)}
                          </td>

                          <td data-label='type'>{item.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.products_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Products organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Quantity</th>

                      <th>ExpiryDate</th>

                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.products_organizations &&
                      Array.isArray(organizations.products_organizations) &&
                      organizations.products_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/products/products-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='description'>{item.description}</td>

                          <td data-label='quantity'>{item.quantity}</td>

                          <td data-label='expiry_date'>
                            {dataFormatter.dateTimeFormatter(item.expiry_date)}
                          </td>

                          <td data-label='type'>{item.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.products_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Sales Organization</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>QuantitySold</th>

                      <th>SaleDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.sales_organization &&
                      Array.isArray(organizations.sales_organization) &&
                      organizations.sales_organization.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/sales/sales-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='quantity_sold'>
                            {item.quantity_sold}
                          </td>

                          <td data-label='sale_date'>
                            {dataFormatter.dateTimeFormatter(item.sale_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.sales_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Sales organizations</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>QuantitySold</th>

                      <th>SaleDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.sales_organizations &&
                      Array.isArray(organizations.sales_organizations) &&
                      organizations.sales_organizations.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/sales/sales-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='quantity_sold'>
                            {item.quantity_sold}
                          </td>

                          <td data-label='sale_date'>
                            {dataFormatter.dateTimeFormatter(item.sale_date)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!organizations?.sales_organizations?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
