import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const employee = JSON.parse(localStorage.getItem('employee'))
const employer = JSON.parse(localStorage.getItem('employer'))
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
    employee: employee ? employee : null,
    employer: employer ? employer : null,
    admin: admin ? admin : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

//REGISTER USER
export const registerEmployer = createAsyncThunk('employer/register', async(userData, thunkAPI) => {
    try {
        return await authService.registerEmployer(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginEmployer = createAsyncThunk('employer/login', async(userData, thunkAPI) => {
    try {
        return await authService.loginEmployer(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateEmployer = createAsyncThunk('employer/update', async(userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.employer.token
        return await authService.updateEmployer(userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const registerEmployee = createAsyncThunk('employee/register', async(userData, thunkAPI) => {
    try {
        return await authService.registerEmployee(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginEmployee = createAsyncThunk('employee/login', async(userData, thunkAPI) => {
    try {
        return await authService.loginEmployee(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateEmployee = createAsyncThunk('employee/update', async(userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.employee.token
        console.log(token)
        return await authService.updateEmployee(userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const searchEmployee = createAsyncThunk('employee/getEmployees', async(searchParams, thunkAPI) => {
    try {
        return await authService.searchEmployee(searchParams)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const searchIndividualEmployee = createAsyncThunk('employee/getIndividualEmployees', async(employeeId, thunkAPI) => {
    try {
        return await authService.searchIndividualEmployee(employeeId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginAdmin = createAsyncThunk('admin/login', async(userData, thunkAPI) => {
    try {
        return await authService.loginAdmin(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("logout", async() => {
    return await authService.logout()
})

export const sendforgotPasswordLink = createAsyncThunk('employer/send-forgotpass-link', async(userData, thunkAPI) => {
    try {
        return await authService.sendforgotPasswordLink(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(registerEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.admin = null
        })
        .addCase(loginEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(loginEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.admin = null
        })
        .addCase(registerEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            state.employer = null
            state.admin = null
        })
        .addCase(registerEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(loginEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            state.employer = null
            state.admin = null
        })
        .addCase(loginEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(updateEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(updateEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.employee = null
            state.admin = null
        })
        .addCase(updateEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            state.employer = null
            state.admin = null
        })
        .addCase(updateEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.employee = null
            state.admin = null
        })
        .addCase(searchEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload           
        })
        .addCase(searchEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(searchIndividualEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(searchIndividualEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.individualEmployee = action.payload
            state.message = null           
        })
        .addCase(searchIndividualEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(sendforgotPasswordLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.message = action.payload
            state.employer = action.payload
            state.employee = null
            state.admin = null
        })
        .addCase(loginAdmin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginAdmin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
            state.employee = null
            state.employer = null
        })
        .addCase(loginAdmin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.employee = null
            state.admin = null
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.employer = null
            state.employee = null
            state.admin = null
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer