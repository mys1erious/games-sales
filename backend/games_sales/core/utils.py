def is_int(text):
    try:
        int(text)
        return True
    except:
        return False


def intersected_params(input_data, patterns):
    return {key: val for key, val in input_data.items() if key in patterns}
