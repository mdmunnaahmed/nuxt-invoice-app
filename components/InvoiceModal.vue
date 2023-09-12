<template>
  <div>
    <div
      @click="checkClick"
      ref="invoiceWrap"
      class="invoice-wrap flex flex-column"
    >
      <form @submit.prevent="submitForm" class="invoice-content">
        <h1>New Invoice</h1>
        <div class="bill-from flex flex-column">
          <h4>Bill Form</h4>
          <div class="input flex flex-column">
            <label for="">Street Address</label>
            <input type="text" v-model="billerStreetAddress" />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="">City</label>
              <input type="text" v-model="billerCity" />
            </div>
            <div class="input flex flex-column">
              <label for="">Zip Code</label>
              <input type="text" v-model="billerZipCode" />
            </div>
            <div class="input flex flex-column">
              <label for="">Country</label>
              <input type="text" v-model="billerCountry" />
            </div>
          </div>
        </div>

        <div class="bill-to flex flex-column">
          <h4>Bill To</h4>
          <div class="input flex flex-column">
            <label for="">Client's Name</label>
            <input type="text" v-model="clientName" />
          </div>
          <div class="input flex flex-column">
            <label for="">Client's Email</label>
            <input type="text" v-model="clientEmail" />
          </div>
          <div class="location-details flex">
            <div class="input flex flex-column">
              <label for="">City</label>
              <input type="text" v-model="clientCity" />
            </div>
            <div class="input flex flex-column">
              <label for="">Zip Code</label>
              <input type="text" v-model="clientZipCode" />
            </div>
            <div class="input flex flex-column">
              <label for="">Country</label>
              <input type="text" v-model="clientCountry" />
            </div>
          </div>
        </div>

        <div class="invoice-work flex flex-column">
          <div class="payment flex">
            <div class="input flex flex-column">
              <label for="">Invoice Date</label>
              <input disabled type="text" v-model="invoiceDate" />
            </div>
            <div class="input flex flex-column">
              <label for="">Payment Due Date</label>
              <input disabled type="text" v-model="paymentDueDate" />
            </div>
          </div>
          <div class="input flex flex-column">
            <label for="">Payment Terms</label>
            <select name="" id="" v-model="paymentTerms">
              <option value="30">Next 30 Days</option>
              <option value="60">Next 60 Days</option>
            </select>
          </div>
          <div class="input flex flex-column">
            <label for="">Product Description</label>
            <input type="text" v-model="productDescription" />
          </div>
          <div class="work-items">
            <h3>Item List</h3>
            <table class="item-list flex">
              <tr class="table-heading">
                <th class="item-name">Item Name</th>
                <th class="qty">Qty</th>
                <th class="price">Price</th>
                <th class="total">Total</th>
              </tr>
              <tr
                class="table-items flex"
                v-for="(item, index) in invoiceItemList"
                :key="index"
              >
                <td class="item-name">
                  <input type="text" v-model="item.itemName" />
                </td>
                <td class="qty">
                  <input type="text" v-model="item.qty" />
                </td>
                <td class="price">
                  <input type="text" v-model="item.price" />
                </td>
                <td class="total flex">
                  ${{ (item.total = item.qty * item.price) }}
                </td>
                <img
                  src="../assets/icon-delete.svg"
                  alt="delete"
                  @click="deleteInvoiceItem(item.id)"
                />
              </tr>
            </table>
            <div class="flex button" @click="addNewInvoice">
              <img src="../assets/icon-plus.svg" alt="add" />
              Add New Item
            </div>
          </div>
        </div>

        <div class="save flex">
          <div class="left">
            <button @click="closeInvoice" class="red">Discard</button>
          </div>
          <div class="right flex">
            <button class="dark-purple" @click="saveDraft">Save Draft</button>
            <button class="purple" @click="publishInvoice">
              Create Invoice
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "invoicemodal",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      loading: null,

      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,

      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,

      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;
        div {
          flex: 1;
        }
      }
    }

    // Invoice Work

    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
